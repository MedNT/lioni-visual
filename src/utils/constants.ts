export const users = [
  {
    id: 1,
    username: 'hajar',
    password: 'admin123',
  },
];

export const positions = ['poste 1', 'poste 2'];

export const operators = [
  {
    id: 1,
    fullName: 'Hajar El Bezzi',
    contractType: 'ANAPEC',
    position: positions[0],
    formatrice: 'équipe 5',
    famille: 'HEV',
    ville: 'Bouznika',
  },
];

export const presence = [
  {
    id: 1,
    operateur_fk: 1,
    date: "02-02-2025",
    statusPresence: "Absent"
  },
  {
    id: 2,
    operateur_fk: 1,
    date: "10-02-2025",
    statusPresence: "Present"
  }
];

export const positionStatus = {
  KO: "Poste critique",
  OK: "Poste Ok"
}