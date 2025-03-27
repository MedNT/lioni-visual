import { apiPaths } from '@/utils/paths';
import { CreateOperateurDTO, OperateurIF } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const QUERY_KEY = 'operators';
const QUERY_KEY_COUNT = 'operators-count';

export const useOperators = () => {
  return useQuery<OperateurIF[], Error>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const { data } = await axios.get<{ operators: OperateurIF[] }>(
        apiPaths.operators()
      );
      return data.operators;
    },
  });
};

export const useCreateOperateur = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOperateur: CreateOperateurDTO) => {
      const { data } = await axios.post(apiPaths.operators(), newOperateur);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useOperatorsCount = () => {
  return useQuery<number, Error>({
    queryKey: [QUERY_KEY_COUNT],
    queryFn: async () => {
      const { data } = await axios.get<{ count: number }>(
        apiPaths.operatorsCount()
      );
      return data.count;
    },
  });
};

export const useDeleteOperateur = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(apiPaths.operators(), {
        params: { id },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error('Delete operator error:', error);
      throw error;
    },
  });
};
