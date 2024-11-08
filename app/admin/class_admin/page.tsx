'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import useIcons from '@/app/utils/components/icons/useIcons';
import Button from '@/app/utils/components/button/Button';
import CSVParser from '@/app/utils/parsers/CSVParser';
import ExcelParser from '@/app/utils/parsers/ExcelParser';
import Input from '@/app/utils/components/input/Input';
import Table from '@/app/utils/components/table/Table';
import useRaceClassStore, {
  RaceClass,
} from '@/app/utils/store/useRaceClassStore';

const ClassAdmin = () => {
  const {
    addRaceClass,
    raceClasses,
    getRaceClasses,
    deleteRaceClass,
    updateRaceClass,
  } = useRaceClassStore();
  const { EditIcon, DeleteIcon } = useIcons();
  const [editing, setEditing] = useState(false);
  const [currentRaceClass, setCurrentRaceClass] = useState<RaceClass | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const parseCompletedRef = useRef(false); // флаг для отслеживания завершения парсинга

  const headerMap = {
    name: 'НАЗВАНИЕ',
  };

  const columns = [
    { header: 'Название', key: 'name' },
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
    getRaceClasses();
  }, [getRaceClasses]);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
    setCurrentRaceClass(null);
  };

  const handleEditClick = (raceClass: RaceClass) => {
    setCurrentRaceClass(raceClass);
    setEditing(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот класс?')) {
      await deleteRaceClass(id);
      getRaceClasses();
    }
  };

  const handleCreateOrUpdateRaceClass = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const name = formData.get(headerMap.name) as string;

    if (currentRaceClass) {
      await updateRaceClass(currentRaceClass.id, {
        name,
      });
    } else {
      await addRaceClass({ name });
    }

    setEditing(false);
    setCurrentRaceClass(null);
    getRaceClasses();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    parseCompletedRef.current = false; // Сбрасываем флаг перед началом парсинга нового файла
  };

  const handleParseComplete = async (parsedData: RaceClass[]) => {
    if (parseCompletedRef.current) return; // Предотвращаем повторный вызов

    parseCompletedRef.current = true; // Устанавливаем флаг выполнения

    for (const raceClass of parsedData) {
      if (raceClass.name) {
        await addRaceClass(raceClass);
      } else {
        console.warn('Skipping incomplete race class:', raceClass);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 text-left my-2">
        Классы
      </h1>
      <div className="flex items-center space-x-4">
        {!editing && (
          <Button onClick={toggleEditing} className="h-10">
            Добавить класс
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
          onSubmit={handleCreateOrUpdateRaceClass}
          className="mt-4 mb-2 space-y-4"
        >
          <Input
            type="text"
            id="name"
            name={headerMap.name}
            placeholder="Название"
            required
            defaultValue={currentRaceClass?.name || ''}
          />
          <Button type="submit" variant="primary">
            Сохранить
          </Button>
          <Button type="button" variant="secondary" onClick={toggleEditing}>
            Отменить
          </Button>
        </form>
      )}

      <Table columns={columns} data={raceClasses} itemsPerPage={20} />
    </div>
  );
};

export default ClassAdmin;
