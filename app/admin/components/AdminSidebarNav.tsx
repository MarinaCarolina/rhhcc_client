'use client';
import Link from 'next/link';
import React from 'react';

interface AdminNavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface AdminSidebarProps {
  adminNavigation: AdminNavigationItem[];
}

const AdminSidebarNav: React.FC<AdminSidebarProps> = ({ adminNavigation }) => {
  return (
    <div>
      <ul className="space-y-2 font-medium">
        {adminNavigation.map((nav, index) => (
          <li key={index}>
            <Link
              href={nav.href}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <nav.icon />
              <span className="flex-1 ms-3 whitespace-nowrap">{nav.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebarNav;
