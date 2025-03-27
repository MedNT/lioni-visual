'use client';

import ErrorPage from '@/components/errors/errorPage';
import LoadingPage from '@/components/loaders/loadingPage';
import OperatorsManagement from '@/components/OperatorsManagement';
import { useOperators } from '@/services/operators.service';

function Page() {
  //get operators list
  const { data: operators, isLoading, isError, isSuccess } = useOperators();

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return <div>{isSuccess && <OperatorsManagement data={operators} />}</div>;
}

export default Page;
