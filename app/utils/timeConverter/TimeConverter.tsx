'use client';

import { FC } from 'react';

interface TimeConverterProps {
  milliseconds: number;
}

const TimeConverter: FC<TimeConverterProps> = ({ milliseconds }) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millis = milliseconds % 1000;

  return (
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0') +
    ':' +
    String(millis).padStart(3, '0')
  );
};

export default TimeConverter;
