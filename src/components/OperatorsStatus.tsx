import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { positions } from '@/utils/constants';
import { FaCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

function OperatorsStatus() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position, key: number) => (
          <TableRow key={key}>
            <TableHead className="capitalize">{position}</TableHead>
            <TableHead>
              {key == 0 ? (
                <FaCheckCircle size={25} color="green" />
              ) : (
                <ImCross size={25} color="red" />
              )}
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default OperatorsStatus;