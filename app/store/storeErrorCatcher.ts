type StoreState = {
  errors: Record<string, { code?: number | string; message: string }> | null;
} & Record<string, any>;

interface IErrorCatcherArgs {
  id: string;
  set: (
    partial:
      | StoreState
      | Partial<StoreState>
      | ((state: StoreState) => StoreState | Partial<StoreState>),
    replace?: boolean | undefined
  ) => void;
}

export const storeErrorCatcher = ({ id, set }: IErrorCatcherArgs) => {
  return async (callback: () => Promise<void> | void) => {
    try {
      return await callback();
    } catch (error: any) {
      // Создаем объект ошибки по умолчанию
      const newError: {
        [id: string]: { code?: number | string; message: string };
      } = {
        [id]: { message: 'Неизвестная ошибка' },
      };

      // Записываем сообщение об ошибке
      if (error instanceof Error) {
        newError[id] = { message: error.message };
      }

      // Добавляем ошибку в состояние errors
      set((state) => ({
        errors: {
          ...state.errors,
          ...newError,
        },
      }));

      console.error(id, error);
    }
  };
};
