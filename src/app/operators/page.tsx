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
import { operators } from '@/utils/constants';

function Page() {
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
            <TableHead>Nom complet</TableHead>
            <TableHead>Type de contrat</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Équipe</TableHead>
            <TableHead>Famille</TableHead>
            <TableHead>Ville</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operators
            .filter((o) => o.fullName.toLowerCase().includes(search.toLowerCase()))
            .map((operator, index) => (
              <TableRow key={index}>
                <TableCell>{operator.fullName}</TableCell>
                <TableCell>{operator.contractType}</TableCell>
                <TableCell>{operator.position}</TableCell>
                <TableCell>{operator.formatrice}</TableCell>
                <TableCell>{operator.famille}</TableCell>
                <TableCell>{operator.ville}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
