import { apiPaths } from '@/utils/paths';
import { AbsenceCreateIF, AbsenceIF } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const QUERY_KEY = "absences";

export const useAbsences = () => {
  return useQuery<AbsenceIF[], Error>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const { data } = await axios.get<{ absences: AbsenceIF[] }>(
        apiPaths.absences()
      );
      return data.absences;
    },
  });
};

export const useCreateAbsence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newAbsence: AbsenceCreateIF) => {
      const { data } = await axios.post(apiPaths.absences(), newAbsence);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};