import { prisma } from '@/db/prisma';
import { CreateOperateurDTO, OperateurIF } from '@/utils/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const operators: OperateurIF[] = await prisma.operateur.findMany({
    include: {
      poste: true
    }
  });
  return NextResponse.json({
    operators,
  });
}

export async function POST(req: Request) {
  try {
    const { nom, prenom, isPolyvalent, posteId }: CreateOperateurDTO = await req.json();
    // testing required field presence
    if (!nom || !prenom || isPolyvalent === undefined || !posteId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const newOperateur = await prisma.operateur.create({
      data: { nom, prenom, isPolyvalent, posteId },
    });
    return NextResponse.json(newOperateur, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Error creating operateur', description: error },
      { status: 500 }
    );
  }
}
