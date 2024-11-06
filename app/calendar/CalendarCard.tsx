import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useIcons from '@/app/utils/icons/useIcons';

// Интерфейс для объекта stage
interface Stage {
  name: string;
  src: string;
  href: string;
  track: string;
  date: string;
}

// Интерфейс для пропсов CalendarCard
interface CalendarCardProps {
  stage: Stage;
}

const CalendarCard: React.FC<CalendarCardProps> = ({ stage }) => {
  const { CalendarIcon, MapIcon } = useIcons();

  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <Link href={stage.href}>
          <Image
            className="rounded-t-lg"
            src={stage.src}
            alt={stage.name}
            width={382}
            height={382}
          />
        </Link>
        <div className="p-5">
          <div className="h-[4em] overflow-hidden">
            <Link href={stage.href}>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {stage.name}
              </h5>
            </Link>
          </div>
          <div className="mb-2">
            <div className="flex items-center space-x-2">
              <CalendarIcon />
              <span className="ml-2">{stage.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapIcon />
              <span className="ml-2">{stage.track}</span>
            </div>
          </div>

          <Link
            href={stage.href}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            Подробнее
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
