import { prisma } from '@/db/prisma';
import { CreateOperateurDTO, OperateurIF } from '@/utils/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const operators: OperateurIF[] = await prisma.operateur.findMany({
    include: {
      poste: true,
    },
  });
  return NextResponse.json({
    operators
  });
}

export async function POST(req: Request) {
  try {
    const { nom, prenom, isPolyvalent, posteId }: CreateOperateurDTO =
      await req.json();
    // testing required field presence
    if (!nom || !prenom || isPolyvalent === undefined || !posteId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    await prisma.operateur.create({
      data: { nom, prenom, isPolyvalent, posteId },
    });
    return NextResponse.json({ status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Error creating operateur', description: error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request
) {
  try {
    // Params id
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Operator ID is required' },
        { status: 400 }
      );
    }
    // Attempt to delete the operator
    const deletedOperator = await prisma.operateur.delete({
      where: { 
        id: Number(id)
      },
    });
    // Return error json
    return NextResponse.json(
      { 
        message: 'Operator deleted successfully', 
        operator: deletedOperator 
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Operator not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { 
        error: 'Error deleting operator', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}