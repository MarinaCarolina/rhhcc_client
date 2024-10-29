'use client';
import React, { FC } from 'react';
import Image from 'next/image';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import Link from 'next/link';

export interface IDropdownItem {
  name: string;
  href: string;
}

export interface IDropdown {
  items: IDropdownItem[];
  className?: string;
}

const Dropdown: FC<IDropdown> = ({ items, className }) => {
  return (
    <div className={className}>
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              src="/user-icon.png"
              alt="user icon"
              width={20}
              height={20}
              priority
            />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
        >
          {items.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Dropdown;
