'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getTodayDate } from '@/utils/helpers';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const posts = [
  { name: 'Poste 1', status: 'OK', backup: false },
  { name: 'Poste 2', status: 'Critique', backup: true },
  { name: 'Poste 3', status: 'Critique', backup: true },
  { name: 'Poste 4', status: 'OK', backup: false },
  { name: 'Poste 2', status: 'OK', backup: false },
  { name: 'Poste 3', status: 'Critique', backup: true },
  { name: 'Poste 4', status: 'Critique', backup: true },
];

interface PostStatusProps {
  showBackupList: () => void;
}

export default function PostStatus({ showBackupList }: PostStatusProps) {
  const criticalPosts = posts.filter(
    (post) => post.status === 'Critique'
  ).length;
  const okPosts = posts.filter((post) => post.status === 'OK').length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          États des Postes pour le {getTodayDate()}
        </h1>
        <p className="text-gray-600">Visualisation des états des postes</p>
      </div>

      <div className="flex gap-4 my-4">
        <Card className="w-fit min-w-[250px]">
          <CardContent className="p-5 flex items-center gap-5">
            <AlertTriangle size={64} className="text-red-500 mx-auto" />
            <div>
              <p className="text-lg font-semibold">Postes Critiques</p>
              <p className="text-4xl font-bold">{criticalPosts}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-fit min-w-[250px]">
          <CardContent className="p-5 flex items-center gap-5">
            <CheckCircle size={64} className="text-green-500 mx-auto" />
            <div>
              <p className="text-lg font-semibold">Postes OK</p>
              <p className="text-4xl font-bold">{okPosts}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Poste</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Backup</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow key={index}>
              <TableCell>{post.name}</TableCell>
              <TableCell>
                {post.status === 'OK' ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <XCircle size={20} className="text-red-500" />
                )}
              </TableCell>
              <TableCell>
                {post.backup ? (
                  <p
                    className="text-blue-500 underline cursor-pointer"
                    onClick={showBackupList}
                  >
                    Voir la liste de backup
                  </p>
                ) : (
                  '-'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
