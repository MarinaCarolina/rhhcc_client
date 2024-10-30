'use client';

import CalendarCard from '@/app/calendar/CalendarCard';

export default function Calendar() {
  const stages = [
    { name: 'Этап 1', src: '/stage1.jpg', href: 'http://rhhcc.ru/stage/107' },
    { name: 'Этап 2', src: '/stage2.jpg', href: 'http://rhhcc.ru/stage/108' },
    { name: 'Этап 3', src: '/stage3.jpg', href: 'http://rhhcc.ru/stage/109' },
    { name: 'Этап 4', src: '/stage4.jpg', href: 'http://rhhcc.ru/stage/110' },
    { name: 'Этап 5', src: '/stage5.jpg', href: 'http://rhhcc.ru/stage/111' },
  ];
  return (
    <div className="pt-4 px-16">
      <h1 className="text-3xl font-bold text-gray-900 text-left my-2">
        Календарь RHHCC 2024
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {stages.map((stage) => (
          <CalendarCard stage={stage} key={stage.name} />
        ))}
      </div>
    </div>
  );
}
