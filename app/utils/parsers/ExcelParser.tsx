import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';

interface ExcelParserProps {
  file: File;
  headerMap: Record<string, string>;
  onParseComplete: (data: any[]) => void;
  onParseEnd: () => void; // новый колбэк для сброса состояния файла
}

const ExcelParser: React.FC<ExcelParserProps> = ({
  file,
  headerMap,
  onParseComplete,
  onParseEnd,
}) => {
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const [header, ...rows] = jsonData;
      const headerIndexes = Object.keys(headerMap).reduce(
        (acc, key) => {
          acc[key] = header.indexOf(headerMap[key]);
          return acc;
        },
        {} as Record<string, number>
      );

      const parsedData = rows.map((row) => {
        const mappedRow: Record<string, any> = {};
        Object.keys(headerIndexes).forEach((key) => {
          const index = headerIndexes[key];
          mappedRow[key] =
            index !== -1 && row[index] ? String(row[index]).trim() : null;
        });
        return mappedRow;
      });

      onParseComplete(parsedData);
      onParseEnd(); // вызываем для сброса состояния файла
    };

    reader.readAsArrayBuffer(file);
  }, [file, headerMap, onParseComplete, onParseEnd]);

  return null;
};

export default ExcelParser;
