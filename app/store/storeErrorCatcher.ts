import { StateCreator } from 'zustand';

interface StoreWithOptionalErrors {
  errors?: Record<string, { message: string }>;
}

interface IErrorCatcherArgs<T extends StoreWithOptionalErrors> {
  id: string;
  set: StateCreator<T> extends (set: infer U, ...args: any[]) => any ? U : never; // Используем тип set из Zustand
}

export const storeErrorCatcher = <T extends StoreWithOptionalErrors>({ id, set }: IErrorCatcherArgs<T>) => {
  return async (callback: () => Promise<void> | void) => {
    try {
      return await callback();
    } catch (error: any) {
      const newError = {
        [id]: { message: error.message || 'Неизвестная ошибка' },
      };

      set((state) => ({
        ...state,
        errors: state.errors ? { ...state.errors, ...newError } : newError,
      }));

      console.error(id, error);
    }
  };
};
