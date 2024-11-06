'use client';
import AdminSidebar from '@/app/admin/components/AdminSidebar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="p-4 sm:ml-64 flex-1">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
