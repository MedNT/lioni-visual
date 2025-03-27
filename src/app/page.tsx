import { clientPaths } from '@/utils/paths';
import { redirect } from 'next/navigation';

export default async function Home() {
  return redirect(clientPaths.operators);
}
