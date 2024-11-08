'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import useTrackStore, { Track } from '@/app/utils/store/useTrackStore';
import useIcons from '@/app/utils/components/icons/useIcons';
import Table from '@/app/utils/components/table/Table';
import Button from '@/app/utils/components/button/Button';
import Input from '@/app/utils/components/input/Input';
import CSVParser from '@/app/utils/parsers/CSVParser';
import ExcelParser from '@/app/utils/parsers/ExcelParser';

export default function TrackAdmin() {
  const { addTrack, tracks, getTracks, deleteTrack, updateTrack } =
    useTrackStore();
  const { EditIcon, DeleteIcon } = useIcons();
  const [editing, setEditing] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const parseCompletedRef = useRef(false); // флаг для отслеживания завершения парсинга

  const headerMap = {
    name: 'НАЗВАНИЕ',
    address: 'АДРЕС',
    lap_length: 'ДЛИНА КРУГА',
    best_time: 'РЕКОРД RHHCC',
  };

  const columns = [
    { header: 'Название', key: 'name' },
    { header: 'Адрес', key: 'address' },
    { header: 'Длина круга', key: 'lap_length' },
    { header: 'Рекорд RHHCC', key: 'best_time' },
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

  useEffect(() => {
    getTracks();
  }, [getTracks]);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
    setCurrentTrack(null);
  };

  const handleEditClick = (track: Track) => {
    setCurrentTrack(track);
    setEditing(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот трек?')) {
      await deleteTrack(id);
      getTracks();
    }
  };

  const handleCreateOrUpdateTrack = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const name = formData.get(headerMap.name) as string;
    const address = formData.get(headerMap.address) as string;
    const lap_length = Number(formData.get(headerMap.lap_length));
    const best_time = Number(formData.get(headerMap.best_time));

    if (currentTrack) {
      await updateTrack(currentTrack.id, {
        name,
        address,
        lap_length,
        best_time,
      });
    } else {
      await addTrack({ name, address, lap_length, best_time });
    }

    setEditing(false);
    setCurrentTrack(null);
    getTracks();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    parseCompletedRef.current = false; // Сбрасываем флаг перед началом парсинга нового файла
  };

  const handleParseComplete = async (parsedData: Track[]) => {
    if (parseCompletedRef.current) return; // Предотвращаем повторный вызов

    parseCompletedRef.current = true; // Устанавливаем флаг выполнения

    for (const track of parsedData) {
      if (
        track.name &&
        track.address &&
        track.lap_length !== null &&
        track.best_time !== null
      ) {
        await addTrack(track);
      } else {
        console.warn('Skipping incomplete track:', track);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 text-left my-2">
        Трассы чемпионата
      </h1>
      <div className="flex items-center space-x-4">
        {!editing && (
          <Button onClick={toggleEditing} className="h-10">
            Добавить трек
          </Button>
        )}
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
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="mt-1 mb-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-t file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {file && file.type === 'text/csv' && (
        <CSVParser
          file={file}
          headerMap={headerMap}
          onParseComplete={handleParseComplete}
          onParseEnd={() => {
            setFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        />
      )}
      {file &&
        (file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'application/vnd.ms-excel') && (
          <ExcelParser
            file={file}
            headerMap={headerMap}
            onParseComplete={handleParseComplete}
            onParseEnd={() => {
              setFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          />
        )}

      {editing && (
        <form
          onSubmit={handleCreateOrUpdateTrack}
          className="mt-4 mb-2 space-y-4"
        >
          <Input
            type="text"
            id="name"
            name={headerMap.name}
            placeholder="Название"
            required
            defaultValue={currentTrack?.name || ''}
          />
          <Input
            type="text"
            id="address"
            name={headerMap.address}
            placeholder="Адрес"
            required
            defaultValue={currentTrack?.address || ''}
          />
          <Input
            type="number"
            id="lap_length"
            name={headerMap.lap_length}
            placeholder="Длина круга (в метрах)"
            required
            defaultValue={currentTrack?.lap_length || ''}
          />
          <Input
            type="number"
            id="best_result"
            name={headerMap.best_time}
            placeholder="Рекорд RHHCC (в миллисекундах)"
            required
            defaultValue={currentTrack?.best_time || ''}
          />
          <Button type="submit" variant="primary">
            Сохранить
          </Button>
          <Button type="button" variant="secondary" onClick={toggleEditing}>
            Отменить
          </Button>
        </form>
      )}

      <Table columns={columns} data={tracks} itemsPerPage={20} />
    </div>
  );
}
