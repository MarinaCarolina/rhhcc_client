import { create } from 'zustand';
import { storeErrorCatcher } from '@/app/utils/store/storeErrorCatcher';
import { sendRequest } from '@/app/utils/store/sendRequest';

export interface RaceClass {
  id: string;
  name: string;
}

interface RaceClassStore {
  raceClass: RaceClass[];
  errors?: Record<string, { message: string }>;
  selectedRaceClass: RaceClass | null;
  getRaceClasses: () => Promise<void>;
  getRaceClassById: (id: string) => Promise<void>;
  addRaceClass: (raceClass: Omit<RaceClass, 'id'>) => Promise<void>;
  updateRaceClass: (id: string, raceClass: Partial<RaceClass>) => Promise<void>;
  deleteRaceClass: (id: string) => Promise<void>;
}

const useRaceClassStore = create<RaceClassStore>((set) => ({
  raceClass: [],
  selectedRaceClass: null,
  errors: {},

  // Получение всех классов
  getRaceClasses: async () => {
    return await storeErrorCatcher({
      id: 'RACECLASS_STORE.FETCH_RACECLASSES',
      set,
    })(async () => {
      const response = await sendRequest<{}, RaceClass[]>({
        url: 'race-class',
        method: 'GET',
      });
      set({ tracks: response.payload || [] });
    });
  },

  // Получение одного класса по ID
  getRaceClassById: async (id: string) => {
    return await storeErrorCatcher({
      id: 'RACECLASS_STORE.FETCH_RACECLASS_BY_ID',
      set,
    })(async () => {
      const response = await sendRequest<{}, RaceClass | null>({
        url: `race-class/${id}`,
        method: 'GET',
      });
      set({ selectedRaceClass: response.payload || null });
    });
  },

  // Добавление нового класса
  addRaceClass: async (raceClass) => {
    return await storeErrorCatcher({
      id: 'RACECLASS_STORE.ADD_RACECLASS',
      set,
    })(async () => {
      const response = await sendRequest<Omit<RaceClass, 'id'>, RaceClass>({
        url: 'race-class',
        method: 'POST',
        data: raceClass,
      });
      set((state) => ({
        raceClasses: [...state.raceClasses, response.payload!],
      }));
    });
  },

  // Обновление класса по ID
  updateRaceClass: async (id: string, raceClass) => {
    return await storeErrorCatcher({
      id: 'RACECLASS_STORE.UPDATE_RACECLASS',
      set,
    })(async () => {
      const response = await sendRequest<Partial<RaceClass>, RaceClass | null>({
        url: `race-class/${id}`,
        method: 'PUT',
        data: raceClass,
      });
      set((state) => ({
        raceClasses: state.RaceClasses.map((t) =>
          t.id === id ? { ...t, ...response.payload } : t
        ),
      }));
    });
  },

  // Удаление класса по ID
  deleteRaceClass: async (id: string) => {
    return await storeErrorCatcher({
      id: 'RACECLASS_STORE.DELETE_RACECLASS',
      set,
    })(async () => {
      await sendRequest<{}, void>({
        url: `race-class/${id}`,
        method: 'DELETE',
      });
      set((state) => ({
        raceClasses: state.raceClasses.filter((t) => t.id !== id),
      }));
    });
  },
}));

export default useRaceClassStore;
