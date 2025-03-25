interface FamilleIF {
  id: number;
  name: string;
  lignes?: LigneIF[];
  Postes?: PosteIF[];
}

interface LigneIF {
  id: number;
  name: string;
  familleId: number;
  famille: FamilleIF;
  Postes: PosteIF[];
}

interface PosteIF {
  id: number;
  name: string;
  isCritical: boolean;
  familleId: number;
  ligneId: number | null;
  Famille?: FamilleIF;
  Ligne?: LigneIF;
  Operateurs?: OperateurIF[];
}

interface OperateurIF {
  id: number;
  nom: string;
  prenom: string;
  isPolyvalent: boolean;
  posteId: number;
  poste: PosteIF;
}


interface CreateOperateurDTO {
  nom: string;
  prenom: string;
  isPolyvalent: boolean;
  posteId: number;
}


export type {
  OperateurIF,
  PosteIF,
  LigneIF,
  FamilleIF,
  CreateOperateurDTO
}