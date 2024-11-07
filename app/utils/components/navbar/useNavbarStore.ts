import { create } from 'zustand';

interface NavbarStoreState {
  navigation: { name: string; href: string }[];
  activeNav: string;
  setActiveNav: (href: string) => void;
  profileDropdownItems: { name: string; href: string }[];
}

const useNavbarStore = create<NavbarStoreState>((set) => ({
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
