import React, { useEffect } from 'react';
import Papa from 'papaparse';

interface CSVParserProps {
  file: File;
  headerMap: Record<string, string>;
  onParseComplete: (data: any[]) => void;
  onParseEnd?: () => void;
}

const CSVParser: React.FC<CSVParserProps> = ({
  file,
  headerMap,
  onParseComplete,
  onParseEnd,
}) => {
  useEffect(() => {
    let parsedOnce = false; // Флаг, чтобы контролировать однократное выполнение

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (parsedOnce) return; // Проверка, чтобы парсинг был только один раз
        parsedOnce = true;

        const rows = results.data;
        const parsedData = rows.map((row: any) => {
          const mappedRow: Record<string, any> = {};
          Object.keys(headerMap).forEach((key) => {
            mappedRow[key] = row[headerMap[key]]
              ? String(row[headerMap[key]]).trim()
              : null;
          });
          return mappedRow;
        });

        onParseComplete(parsedData);

        // Проверяем наличие onParseEnd перед вызовом
        if (onParseEnd) {
          onParseEnd(); // Вызываем для сброса состояния файла, если передан
        }
      },
    });

    return () => {
      parsedOnce = false; // Сброс флага при размонтировании
    };
  }, [file, headerMap, onParseComplete, onParseEnd]);

  return null;
};

export default CSVParser;
