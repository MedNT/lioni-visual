import { apiPaths } from '@/utils/paths';
import { PosteIF } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usePostes = () => {
  return useQuery<PosteIF[], Error>({
    queryKey: ['postes'],
    queryFn: async () => {
      const { data } = await axios.get<{ postes: PosteIF[] }>(
        apiPaths.postes()
      );
      return data.postes;
    },
  });
};
