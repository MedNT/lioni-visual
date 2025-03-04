import { FaCheckCircle } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImCross } from 'react-icons/im';

function StatusCard({
  operator,
  status,
}: {
  operator: string;
  status: string;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{operator}</CardTitle>
      </CardHeader>
      <CardContent>
        {status == 'ok' ? (
          <FaCheckCircle size={25} color="green" />
        ) : (
          <ImCross size={25} color="red" />
        )}
      </CardContent>
    </Card>
  );
}

export default StatusCard;
