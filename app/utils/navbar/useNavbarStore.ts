import { create } from 'zustand';

const useNavbarStore = create((set) => ({
    activeNav: '/',
    setActiveNav: (href) => set({ activeNav: href }),
}));

export default useNavbarStore;
