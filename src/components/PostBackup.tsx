'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const backupOperators = [
  { name: "Hajar El Bezzi 1", post: "Sans Poste" },
  { name: "Hajar El Bezzi 2", post: "Sans Poste" },
  { name: "Hajar El Bezzi 3", post: "Sans Poste" },
  { name: "Hajar El Bezzi 4", post: "Sans Poste" },
  { name: "Hajar El Bezzi 5", post: "Sans Poste" },
];

interface PostBackupProps {
  postName: string;
  open: boolean;
  onClose: () => void;
}

export default function PostBackup({ postName, open, onClose }: PostBackupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Liste de Backup pour le poste: <span className="font-bold">{postName}</span></DialogTitle>
        </DialogHeader>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opérateur</TableHead>
              <TableHead>Poste</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backupOperators.map((operator, index) => (
              <TableRow key={index}>
                <TableCell>{operator.name}</TableCell>
                <TableCell>{operator.post}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} variant="secondary">Fermer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}