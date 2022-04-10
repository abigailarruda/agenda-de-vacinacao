import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';

import { api } from 'services/api';

export function useFetch<TData = unknown, TError = unknown>(url: string, config?: AxiosRequestConfig) {
  const key = config ? [url, config] : url;

  const { data, error, mutate, isValidating } = useSWR<TData, TError>(
    key,
    async () => {
      const response = await api.get<TData>(url, config);

      return response.data;
    },
    { revalidateOnFocus: false },
  );

  return { data, error, mutate, isValidating };
}
