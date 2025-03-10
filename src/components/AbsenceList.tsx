import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { operators } from '@/utils/constants';
import { Switch } from './ui/switch';

export function AbsenceList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Contract Type</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Formatrice</TableHead>
          <TableHead>Famille</TableHead>
          <TableHead>Ville</TableHead>
          <TableHead>Presence</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {operators.concat(operators).map((op, key: number) => (
          <TableRow key={key}>
            <TableHead>{op.fullName}</TableHead>
            <TableHead>{op.contractType}</TableHead>
            <TableHead>{op.position}</TableHead>
            <TableHead>{op.formatrice}</TableHead>
            <TableHead>{op.famille}</TableHead>
            <TableHead>{op.ville}</TableHead>
            <TableHead>
              <Switch />
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
