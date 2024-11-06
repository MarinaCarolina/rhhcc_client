'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import Table from '@/app/utils/table/Table';
import useTrackStore, {Track} from '@/app/store/useTrackStore';
import Button from '@/app/utils/button/Button';
import Input from '@/app/utils/input/Input';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import useIcons from "@/app/utils/icons/useIcons";

export default function TrackAdmin() {
  const { addTrack, tracks, getTracks, deleteTrack, updateTrack } = useTrackStore();
  const [editing, setEditing] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const {EditIcon, DeleteIcon} = useIcons()

  useEffect(() => {
    getTracks(); // Загружаем данные при монтировании компонента
  }, [getTracks]);

  // Определяем заголовки таблицы и соответствующие ключи в данных
  const columns = [
    { header: 'Название', key: 'name' },
    { header: 'Адрес', key: 'address' },
    { header: 'Длина круга', key: 'lap_length' },
    { header: 'Рекорд RHHCC', key: 'best_result' },
    {
      header: 'Редактировать',
      key: 'actions',
      render: (row: any) => (
          <div className="flex space-x-2">
            <EditIcon
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEditClick(row)}
            />
            <DeleteIcon
                className="text-red-500 cursor-pointer"
                onClick={() => handleDeleteClick(row.id)}
            />
          </div>
      ),
    },
  ];

  // Функция для переключения режима редактирования
  const toggleEditing = () => {
    setEditing((prev) => !prev);
    setCurrentTrack(null); // Очистить текущий трек при отмене редактирования
  };

  // Функция редактирования трека
  const handleEditClick = (track: Track) => {
    setCurrentTrack(track); // Устанавливаем текущий трек для редактирования
    setEditing(true);       // Включаем режим редактирования
  };

  // Функция удаления трека
  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот трек?')) {
      await deleteTrack(id);
      getTracks(); // Обновляем список после удаления
    }
  };

  // Функция для обработки отправки формы
  const handleCreateOrUpdateTrack = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const lap_length = Number(formData.get('lap_length'));
    const best_result = Number(formData.get('best_result'));

    if (currentTrack) {
      // Режим обновления
      await updateTrack(currentTrack.id, { name, address, lap_length, best_result });
    } else {
      // Режим создания
      await addTrack({ name, address, lap_length, best_result });
    }

    setEditing(false);
    setCurrentTrack(null);
    getTracks();
  };

  // Обработка загрузки файла
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      handleCSVUpload(file);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      handleExcelUpload(file);
    } else {
      alert(
          'Неподдерживаемый формат файла. Пожалуйста, загрузите CSV или Excel файл.'
      );
    }
  };

  // Обработка CSV файла
  const handleCSVUpload = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const tracks = results.data.map((row: any) => ({
          name: String(row.name), // Преобразуем в string
          address: String(row.address), // Преобразуем в string
          lap_length: Number(row.lap_length), // Преобразуем в number
          best_result: Number(row.best_result), // Преобразуем в number
        }));

        // Загружаем данные в TrackStore
        for (const track of tracks) {
          await addTrack(track);
        }
      },
    });
  };

  // Обработка Excel файла
  const handleExcelUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Указываем тип для jsonData
      const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const [header, ...rows] = jsonData;
      const tracks = rows.map((row) => ({
        name: String(row[header.indexOf('name')]), // Преобразуем в string
        address: String(row[header.indexOf('address')]), // Преобразуем в string
        lap_length: Number(row[header.indexOf('lap_length')]), // Преобразуем в number
        best_result: Number(row[header.indexOf('best_result')]), // Преобразуем в number
      }));

      // Загружаем данные в TrackStore
      for (const track of tracks) {
        await addTrack(track);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 text-left my-2">
          Трассы чемпионата
        </h1>
        <div className="flex items-center space-x-4">
          {!editing && <Button onClick={toggleEditing} className="h-10">
            Добавить трек
          </Button>}
          {!editing && <span>или</span>}
          <div className="flex flex-col items-start">
            <label
                htmlFor="fileUpload"
                className="block text-sm font-medium text-gray-700"
            >
              Загрузить файлом (в формате CSV или Excel)
            </label>
            <input
                type="file"
                id="fileUpload"
                onChange={handleFileUpload}
                className="mt-1 mb-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-t file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
        {editing && (
            <form onSubmit={handleCreateOrUpdateTrack} className="mt-4 mb-2 space-y-4">
              <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Название"
                  required
                  defaultValue={currentTrack?.name || ''}
              />
              <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Адрес"
                  required
                  defaultValue={currentTrack?.address || ''}
              />
              <Input
                  type="number"
                  id="lap_length"
                  name="lap_length"
                  placeholder="Длина круга (в метрах)"
                  required
                  defaultValue={currentTrack?.lap_length || ''}
              />
              <Input
                  type="number"
                  id="best_result"
                  name="best_result"
                  placeholder="Рекорд RHHCC (в миллисекундах)"
                  required
                  defaultValue={currentTrack?.best_result || ''}
              />
              <Button type="submit" variant="primary">Сохранить</Button>
              <Button type="submit" variant="secondary" onClick={toggleEditing}>Отменить</Button>
            </form>
        )}

        <Table columns={columns} data={tracks}/>
      </div>
  );
}
