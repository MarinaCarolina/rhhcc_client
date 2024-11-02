'use client';

import React from 'react';
import get from 'lodash/get';

interface IButton {
  className?: string;
  data?: { [key: string]: string };
  dataKey?: string;
  onClick?: (...args: any[]) => void;
  id?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'unstyled';
  name?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<IButton> = (props) => {
  const variant = get(props, 'variant', 'primary');
  const className = get(props, 'className', '');
  const onClick = get(props, 'onClick');
  const id = get(props, 'id', '');
  const name = get(props, 'name', '');
  const disabled = get(props, 'disabled', false);
  const type = get(props, 'type', 'button');
  const size = get(props, 'size', 'default');

  const handleClick = () => {
    if (onClick) onClick();
  };

  const variants = {
    primary: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 text-white',
    secondary:
      'bg-gray-200 hover:bg-gray-300 border-gray-300 hover:bg-gray-200 text-gray-700',
    danger: 'bg-red-500  hover:bg-red-600  focus:ring-red-300 text-white',
    unstyled: '',
  };

  const sizeClasses = {
    default: 'px-3 py-2 text-sm',
    small: 'px-2 py-1 text-xs',
  };

  const baseClasses =
    'font-medium text-center rounded focus:ring-4 focus:outline-none ml-0 m-1 ';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClasses = [
    baseClasses,
    variants[variant],
    sizeClasses[size],
    className,
    disabledClasses,
  ].join(' ');

  return (
    <button
      id={id}
      name={name}
      className={combinedClasses}
      onClick={handleClick}
      data-testid={'button'}
      type={type}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
