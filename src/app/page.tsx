import { prisma } from "@/db/prisma"

export default async function Home() {

  const operateurs  = await prisma.operateur.findMany();



  return <div>
    {operateurs.map((op, key) => (
      <p key={key}>{op.nom} {op.posteId}</p>
    ))}
  </div>
}
