'use client';

import Card from '@/components/Card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMemo, useState } from 'react';
import AddOperatorForm from '@/components/AddOperatorForm';
import { OperateurIF } from '@/utils/types';
import { FaCheckCircle } from 'react-icons/fa';
import { FaSquareXmark } from 'react-icons/fa6';
import {
  useDeleteOperateur,
  useOperatorsCount,
} from '@/services/operators.service';
import { Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Interface Operators Management Props
interface OperatorsManagementProps {
  data: OperateurIF[];
}

function OperatorsManagement({ data }: OperatorsManagementProps) {
  const [search, setSearch] = useState('');

  // loading operators count
  const { data: operatorsCount, isSuccess } = useOperatorsCount();
  // delete mutation
  const { mutateAsync: deleteOperator } = useDeleteOperateur();

  // Memoized filtered operators
  const filteredOperators = useMemo(() => {
    if (!search) return data;
    // search term
    const searchTermLower = search.toLowerCase().trim();
    // retur filetered data
    return data.filter(
      (operator) =>
        operator.nom.toLowerCase().includes(searchTermLower) ||
        operator.prenom.toLowerCase().includes(searchTermLower) ||
        operator.poste.name.toLowerCase().includes(searchTermLower)
    );
  }, [data, search]);

  /**
   * Delete operator by ID
   * @param operator: OperateurIF
   */
  const onDelete = (operator: OperateurIF) => {
    if (
      confirm(
        'Êtes-vous sûr de vouloir enregistrer ceci dans la base de données ?'
      )
    ) {
      // Trigger Delete Mutation
      deleteOperator(operator.id, {
        onSuccess: () => {
          toast({
            title: 'Succès',
            description: `L'opérateur ${operator.prenom} ${operator.nom} a été supprimé!`,
            color: 'green',
          });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          toast({
            title: 'Erreur',
            description:
              error.response?.data?.error ||
              "Impossible de supprimer l'opérateur",
            color: 'red',
          });
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Opérateurs</h1>
        <p className="text-gray-600">Gérer vos opérateurs</p>
      </div>

      <Card
        title="Total des Opérateurs"
        value={isSuccess ? operatorsCount : 0}
      />

      <div className="flex justify-between mb-4">
        <AddOperatorForm />
        <Input
          placeholder="Rechercher par nom, prénom ou poste..."
          className="w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Polyvalent</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOperators.map((operator) => (
            <TableRow key={operator.id}>
              <TableCell>{operator.nom}</TableCell>
              <TableCell>{operator.prenom}</TableCell>
              <TableCell>
                {operator.isPolyvalent ? (
                  <FaCheckCircle color="green" />
                ) : (
                  <FaSquareXmark color="red" />
                )}
              </TableCell>
              <TableCell>{operator.poste.name}</TableCell>
              <TableCell className="flex flex-col items-end text-right">
                <Trash
                  className="cursor-pointer"
                  size={18}
                  color="red"
                  onClick={() => {
                    onDelete(operator);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredOperators.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          Aucun opérateur trouvé
        </div>
      )}
    </div>
  );
}

export default OperatorsManagement;
