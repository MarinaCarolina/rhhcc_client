import { create } from 'zustand';

const useNavbarStore = create((set) => ({
  activeNav: '/',
  setActiveNav: (href) => set({ activeNav: href }),
  navigation: [
    { name: 'Календарь', href: '/calendar' },
    { name: 'Результаты', href: '/results' },
    { name: 'Регламент', href: '/docs' },
    { name: 'Статистика', href: '/stats' },
    { name: 'Контакты', href: '/contacts' },
  ],
  profileDropdownItems: [
    { name: 'Администрирование', href: '/admin' },
    { name: 'Выйти', href: '/logout' },
  ],
}));

export default useNavbarStore;
