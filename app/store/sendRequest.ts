export interface IRequest<TData> {
  url: string;
  method: string;
  data?: TData;
  responseType?: 'json' | 'text';
}

export interface IResponse<TReturn> {
  message: string;
  payload?: TReturn;
  success?: boolean;
  fail?: boolean;
  id: string;
}

export async function sendRequest<TData, TReturn>(req: IRequest<TData>) {
  const { url, method, data, responseType = 'json' } = req;
  try {
    // Выполняем запрос на сервер
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/${url}`,
      {
        method,
        body: method !== 'GET' ? JSON.stringify(data) : null,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Парсинг ответа
    const responseRes: IResponse<TReturn> = await response[responseType]();

    if (responseRes.fail) {
      throw new Error(`${responseRes.id}: ${responseRes.message}`);
    }

    return responseRes;
  } catch (error) {
    console.error('Проблема с запросом:', error);
    throw error;
  }
}
