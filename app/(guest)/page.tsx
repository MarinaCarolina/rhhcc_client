import Image from 'next/image';
import React from 'react';
import Calendar from '@/app/calendar/page';

export default function MainPage() {
  return (
    <div>
      <Image
        src="/YmB6d71yics.jpg"
        alt="user icon"
        width={1600}
        height={200}
        priority
      />
      <Calendar />
    </div>
  );
}
