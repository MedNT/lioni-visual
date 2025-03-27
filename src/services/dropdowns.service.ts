import { apiPaths } from '@/utils/paths';
import { PosteIF } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const QUERY_KEY = "postes";

export const usePostes = () => {
  return useQuery<PosteIF[], Error>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const { data } = await axios.get<{ postes: PosteIF[] }>(
        apiPaths.postes()
      );
      return data.postes;
    },
  });
};