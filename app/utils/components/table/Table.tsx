'use client';
import TimeConverter from '@/app/utils/timeConverter/TimeConverter';
import Pagination from "@/app/utils/components/pagination/Pagination";
import {FC, useState} from "react";

interface Column {
  header: string;
  key: string;
  render?: (row: Record<string, any>) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  itemsPerPage?: number;
}

const Table: FC<TableProps> = ({ columns, data, itemsPerPage= 20 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Расчёт данных для текущей страницы
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Обработчик для изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column, colIndex) => (
                <th key={colIndex} scope="col" className="px-6 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b hover:bg-red-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {column.render
                      ? column.render(row)
                      : column.key.toLowerCase().includes('time')
                        ? TimeConverter(row[column.key] ?? 0)
                        : (row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Table;
