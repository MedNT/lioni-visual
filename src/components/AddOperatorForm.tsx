'use client';

import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
import { CreateOperateurDTO } from '@/utils/types';
import { useCreateOperateur } from '@/services/operators.service';
import { useToast } from '@/hooks/use-toast';

// Validation Schema
const OperateurValidationSchema = Yup.object().shape({
  nom: Yup.string()
    .required('Le nom est obligatoire')
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  prenom: Yup.string()
    .required('Le prénom est obligatoire')
    .min(3, 'Le prénom doit contenir au moins 3 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  posteId: Yup.number()
    .required('Le poste est obligatoire')
    .positive('Veuillez sélectionner un poste valide'),
  isPolyvalent: Yup.boolean()
});

export default function AddOperatorForm() {
  const { data: postes, isSuccess } = usePostes();
  const { mutateAsync: CreateOperator, isPending } = useCreateOperateur();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  // Initial form values
  const initialValues: CreateOperateurDTO = {
    nom: '',
    prenom: '',
    isPolyvalent: false,
    posteId: postes && postes.length > 0 ? postes[0].id : 1,
  };

  // Handle form submission
  const handleSubmit = async (
    values: CreateOperateurDTO, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await CreateOperator(values);
      
      toast({
        title: 'Success',
        description: 'Operateur ajouté avec success!',
        color: 'green',
      });
      
      // Reset form and close dialog
      resetForm();
      setOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.error || 'Une erreur est survenue',
        color: 'red',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Ajouter Opérateur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <Formik
          initialValues={initialValues}
          validationSchema={OperateurValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <DialogHeader>
                <DialogTitle>Informations de l&apos;opérateur</DialogTitle>
                <DialogDescription>
                  Remplissez les informations de l&apos;opérateur ci-dessous.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {/* Nom Input */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom" className="text-right">
                    Nom
                  </Label>
                  <div className="col-span-3">
                    <Field
                      as={Input}
                      id="nom"
                      name="nom"
                      required
                    />
                    <ErrorMessage 
                      name="nom" 
                      component="div" 
                      className="text-red-500 text-sm mt-1" 
                    />
                  </div>
                </div>

                {/* Prenom Input */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prenom" className="text-right">
                    Prénom
                  </Label>
                  <div className="col-span-3">
                    <Field
                      as={Input}
                      id="prenom"
                      name="prenom"
                      required
                    />
                    <ErrorMessage 
                      name="prenom" 
                      component="div" 
                      className="text-red-500 text-sm mt-1" 
                    />
                  </div>
                </div>

                {/* Poste Select */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="posteId" className="text-right">
                    Poste
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={String(values.posteId)}
                      onValueChange={(value) => 
                        setFieldValue('posteId', Number(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un poste" />
                      </SelectTrigger>
                      <SelectContent>
                        {isSuccess &&
                          postes.map((poste) => (
                            <SelectItem 
                              key={poste.id} 
                              value={String(poste.id)}
                            >
                              {poste.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage 
                      name="posteId" 
                      component="div" 
                      className="text-red-500 text-sm mt-1" 
                    />
                  </div>
                </div>

                {/* Polyvalent Switch */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isPolyvalent" className="text-right">
                    Polyvalent
                  </Label>
                  <Switch
                    id="isPolyvalent"
                    checked={values.isPolyvalent}
                    onCheckedChange={(checked) => 
                      setFieldValue('isPolyvalent', checked)
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}