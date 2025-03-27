export const clientPaths = {
  home: '/',
  operators: '/operators',
  absences: '/absences',
  postes: '/postes',
} as const;

const BASE_PATH =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiPaths = {
  postes: () => `${BASE_PATH}/postes`,
  operators: () => `${BASE_PATH}/operators`,
  operatorsCount: () => `${BASE_PATH}/operators/count`,
  absences: () => `${BASE_PATH}/absences`,
} as const;
