'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { usePostes } from '@/services/dropdowns.service';
import { Switch } from '@/components/ui/switch';
import { CreateOperateurDTO, OperateurIF } from '@/utils/types';
import { useCreateOperateur } from '@/services/operators.service';
import { useToast } from '@/hooks/use-toast';


export default function AddOperatorForm() {
  const { data: postes, isSuccess } = usePostes();
  const { mutateAsync: CreateOperator, isPending } = useCreateOperateur();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateOperateurDTO>({
    nom: '',
    prenom: '',
    isPolyvalent: false,
    posteId: 1,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: keyof OperateurIF, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CreateOperator(formData).then(() => {
      toast({
        title: "Success",
        description: "Operateur ajouté avec success!",
        color: "green"
      })
    })
    .catch((error: {error: string, description: string}) => {
      toast({
        title: "Erreur",
        description: error.error,
        color: "red"
      })
    })
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Ajouter Opérateur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Informations de l`&apos;`employé</DialogTitle>
            <DialogDescription>
              Remplissez les informations de l`&apos;`employé ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nom" className="text-right">
                Nom
              </Label>
              <Input id="nom" value={formData.nom} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prenom" className="text-right">
                Prénom
              </Label>
              <Input id="prenom" value={formData.prenom} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="posteId" className="text-right">
                Poste
              </Label>
              <Select value={String(formData.posteId)} onValueChange={(value) => handleSelectChange('posteId', Number(value))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un poste" />
                </SelectTrigger>
                <SelectContent>
                  {isSuccess && postes.map((poste) => (
                    <SelectItem key={poste.id} value={String(poste.id)}>
                      {poste.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isPolyvalent" className="text-right">
                Polyvalent
              </Label>
              <Switch
                id="isPolyvalent"
                checked={formData.isPolyvalent}
                onCheckedChange={(checked) => handleSelectChange('isPolyvalent', checked)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

