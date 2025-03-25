export const paths = {
  operators: "/operators",
  absence: "/absence",
  postes: "/postes"
} as const;

const BASE_PATH =  `http://localhost:3000/api`;

export const apiPaths = {
  postes: () => `${BASE_PATH}/postes`,
  operators: () => `${BASE_PATH}/operators`
}