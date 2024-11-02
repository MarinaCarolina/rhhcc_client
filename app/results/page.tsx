'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import Table from '@/app/utils/table/Table';
import useTrackStore from '@/app/store/useTrackStore';
import Button from '@/app/utils/button/Button';
import Input from '@/app/utils/input/Input';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export default function Results() {
  const { addTrack, tracks, getTracks } = useTrackStore();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getTracks(); // Загружаем данные при монтировании компонента
  }, [getTracks]);

  // Определяем заголовки таблицы и соответствующие ключи в данных
  const columns = [
    { header: 'Название', key: 'name' },
    { header: 'Адрес', key: 'address' },
    { header: 'Длина круга', key: 'lap_length' },
    { header: 'Рекорд RHHCC', key: 'best_result' },
  ];

  // Функция для переключения режима редактирования
  const toggleEditing = () => setEditing((prev) => !prev);

  // Функция для обработки отправки формы
  const handleCreateTrack = async (event: FormEvent) => {
    event.preventDefault();

    // Получение данных из формы с использованием FormData
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const lap_length = Number(formData.get('lap_length'));
    const best_result = Number(formData.get('best_result'));

    // Добавление нового трека через store
    await addTrack({ name, address, lap_length, best_result });

    // Сброс режима редактирования после добавления
    setEditing(false);
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
      const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

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
      <h1 className="text-3xl font-bold text-gray-900 text-left my-2">
        Трассы чемпионата
      </h1>
      <Button onClick={toggleEditing}>
        {editing ? 'Отменить' : 'Добавить трек'}
      </Button>
      {editing && (
        <form onSubmit={handleCreateTrack} className="mt-4 space-y-4">
          <Input
            type="text"
            id="name"
            name="name"
            className="text-m block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Название"
            required
          />
          <Input
            type="text"
            id="address"
            name="address"
            className="text-m block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Адрес"
            required
          />
          <Input
            type="number"
            id="lap_length"
            name="lap_length"
            className="text-m block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Длина круга (в метрах)"
            required
          />
          <Input
            type="number"
            id="best_result"
            name="best_result"
            className="text-m block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Рекорд RHHCC (в миллисекундах)"
            required
          />
          <Button type="submit">Сохранить</Button>
        </form>
      )}

      <div className="mt-4">
        <label
          htmlFor="fileUpload"
          className="block text-sm font-medium text-gray-700"
        >
          Загрузить CSV или Excel файл
        </label>
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileUpload}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <Table columns={columns} data={tracks} />
    </div>
  );
}
