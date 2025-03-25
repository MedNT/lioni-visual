import OperatorsManagement from '@/components/OperatorsManagement';
import { useOperators } from '@/services/operators.service';

function Page() {
  //get operators list
  const { data: operators, isLoading, isError, isSuccess } = useOperators();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error Loading Data...</p>;

  return <div>{isSuccess && <OperatorsManagement data={operators} />}</div>;
}

export default Page;
