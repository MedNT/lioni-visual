import Card from './Card';
import { AbsenceList } from './AbsenceList';
import { getTodayDate } from '@/utils/helpers';

function AbsenceManagement() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          Gestion d’absences pour le {getTodayDate()}
        </h1>
        <p className="text-gray-600">Gérer vos absences</p>
      </div>

      <div className="flex gap-4 my-4 flex-wrap">
        <Card title="Total des Opérateurs" value={800} />
        <Card title="Opérateurs Présents" value={300} />
        <Card title="Opérateurs Absents" value={100} />
        <Card title="Opérateurs Remplaçants" value={26} />
      </div>

      <AbsenceList />
    </div>
  );
}

export default AbsenceManagement;
