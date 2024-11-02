import { create } from 'zustand';
import { storeErrorCatcher } from '@/app/store/storeErrorCatcher';
import { sendRequest } from '@/app/store/sendRequest';

export interface Track {
  id: string;
  name: string;
  address: string;
  lap_length: number;
  best_result: number;
}

interface TrackStore {
  tracks: Track[];
  errors?: Record<string, { message: string }>;
  selectedTrack: Track | null;
  getTracks: () => Promise<void>;
  getTrackById: (id: string) => Promise<void>;
  addTrack: (track: Omit<Track, 'id'>) => Promise<void>;
  updateTrack: (id: string, track: Partial<Track>) => Promise<void>;
  deleteTrack: (id: string) => Promise<void>;
}

const useTrackStore = create<TrackStore>((set) => ({
  tracks: [],
  selectedTrack: null,
  errors: {},

  // Получение всех треков
  getTracks: async () => {
    return await storeErrorCatcher({
      id: 'TRACK_STORE.FETCH_TRACKS',
      set,
    })(async () => {
      const response = await sendRequest<{}, Track[]>({
        url: 'track',
        method: 'GET',
      });
      set({ tracks: response.payload || [] });
    });
  },

  // Получение одного трека по ID
  getTrackById: async (id: string) => {
    return await storeErrorCatcher({
      id: 'TRACK_STORE.FETCH_TRACK_BY_ID',
      set,
    })(async () => {
      const response = await sendRequest<{}, Track | null>({
        url: `track/${id}`,
        method: 'GET',
      });
      set({ selectedTrack: response.payload || null });
    });
  },

  // Добавление нового трека
  addTrack: async (track) => {
    return await storeErrorCatcher({
      id: 'TRACK_STORE.ADD_TRACK',
      set,
    })(async () => {
      const response = await sendRequest<Omit<Track, 'id'>, Track>({
        url: 'track',
        method: 'POST',
        data: track,
      });
      set((state) => ({
        tracks: [...state.tracks, response.payload!],
      }));
    });
  },

  // Обновление трека по ID
  updateTrack: async (id: string, track) => {
    return await storeErrorCatcher({
      id: 'TRACK_STORE.UPDATE_TRACK',
      set,
    })(async () => {
      const response = await sendRequest<Partial<Track>, Track | null>({
        url: `track/${id}`,
        method: 'PUT',
        data: track,
      });
      set((state) => ({
        tracks: state.tracks.map((t) =>
          t.id === id ? { ...t, ...response.payload } : t
        ),
      }));
    });
  },

  // Удаление трека по ID
  deleteTrack: async (id: string) => {
    return await storeErrorCatcher({
      id: 'TRACK_STORE.DELETE_TRACK',
      set,
    })(async () => {
      await sendRequest<{}, void>({
        url: `track/${id}`,
        method: 'DELETE',
      });
      set((state) => ({
        tracks: state.tracks.filter((t) => t.id !== id),
      }));
    });
  },
}));

export default useTrackStore;
