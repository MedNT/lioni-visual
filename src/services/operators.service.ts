import { apiPaths } from '@/utils/paths';
import { CreateOperateurDTO, OperateurIF } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


export const useOperators = () => {
  return useQuery<OperateurIF[], Error>({
    queryKey: ['operateurs'],
    queryFn: async () => {
      const { data } = await axios.get<{ operateurs: OperateurIF[] }>(
        apiPaths.operators()
      );
      return data.operateurs;
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
      queryClient.invalidateQueries({ queryKey: ['operateurs'] });
    },
  });
};
