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
import { useState } from 'react';
import AddOperatorForm from '@/components/AddOperatorForm';
import { OperateurIF } from '@/utils/types';
import { FaCheckCircle } from 'react-icons/fa';
import { FaSquareXmark } from 'react-icons/fa6';

// Interface Operators Management Props
interface OperatorsManagementProps {
  data: OperateurIF[];
}

function OperatorsManagement({ data }: OperatorsManagementProps) {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Opérateurs</h1>
        <p className="text-gray-600">Gérer vos opérateurs</p>
      </div>

      <div>
        <Card title="Total des Opérateurs" value={800} />
      </div>

      <div className="flex justify-between mb-4">
        <AddOperatorForm />
        <Input
          placeholder="Rechercher..."
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((operator, index) => (
            <TableRow key={index}>
              <TableCell>{operator.prenom}</TableCell>
              <TableCell>{operator.nom}</TableCell>
              <TableCell>
                {operator.isPolyvalent ? (
                  <FaCheckCircle color="green" />
                ) : (
                  <FaSquareXmark color="red" />
                )}
              </TableCell>
              <TableCell>{operator.poste.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OperatorsManagement;
