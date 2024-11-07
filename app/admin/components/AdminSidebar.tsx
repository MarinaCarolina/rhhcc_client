'use client';
import AdminSidebarNav from '@/app/admin/components/AdminSidebarNav';
import useIcons from '@/app/utils/components/icons/useIcons';

export default function AdminSidebar() {
  const { CalendarIcon, ClassIcon, PilotIcon, ResultIcon, CarIcon, TrackIcon } =
    useIcons();

  const adminNavigation = [
    { name: 'Календарь', href: '/admin/calendar_admin', icon: CalendarIcon },
    { name: 'Классы', href: '/admin/class_admin', icon: ClassIcon },
    { name: 'Пилоты', href: '/admin/pilot_admin', icon: PilotIcon },
    { name: 'Результаты этапа', href: '/admin/result_admin', icon: ResultIcon },
    { name: 'Авто', href: '/admin/auto_admin', icon: CarIcon },
    { name: 'Трассы', href: '/admin/track_admin', icon: TrackIcon },
  ];

  return (
    <aside className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-50">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <AdminSidebarNav adminNavigation={adminNavigation} />
        </ul>
      </div>
    </aside>
  );
}
