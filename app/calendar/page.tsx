'use client';

import CalendarCard from '@/app/calendar/CalendarCard';

export default function Calendar() {
  const stages = [
    {
      name: '1. Гран-при «YOKOHAMA»',
      track: 'Автодром «Moscow Raceway»',
      date: '21 апреля 2024',
      src: '/stage1.jpg',
      href: 'http://rhhcc.ru/stage/107',
    },
    {
      name: '2. Гран-при «SUSPENSION CENTER»',
      track: 'Автодром «Смоленское кольцо»',
      date: '18-19 мая 2024',
      src: '/stage2.jpg',
      href: 'http://rhhcc.ru/stage/108',
    },
    {
      name: '3. Гран-при «TYREWARS»',
      track: 'Автодром «ADM Raceway»',
      date: '6-7 июля 2024',
      src: '/stage3.jpg',
      href: 'http://rhhcc.ru/stage/109',
    },
    {
      name: '4. Гран-при «SHONX»',
      track: 'Автодром «Нижегородское кольцо»',
      date: '17-18 августа 2024',
      src: '/stage4.jpg',
      href: 'http://rhhcc.ru/stage/110',
    },
    {
      name: '5. Гран-при «Золотая Осень»',
      track: 'Автодром «Смоленское кольцо»',
      date: '7-8 сентября 2024',
      src: '/stage5.jpg',
      href: 'http://rhhcc.ru/stage/111',
    },
  ];
  return (
    <div className="pt-4 px-16">
      <h1 className="text-3xl font-bold text-gray-900 text-left my-2">
        Календарь RHHCC 2024
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {stages.map((stage) => (
          <div key={stage.name}>
            <CalendarCard stage={stage} />
          </div>
        ))}
      </div>
    </div>
  );
}
