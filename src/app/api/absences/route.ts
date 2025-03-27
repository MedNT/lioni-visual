import { prisma } from '@/db/prisma';
import { AbsenceCreateIF } from '@/utils/types';
import { Absence } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const absences: Absence[] = await prisma.absence.findMany({
      include: { operator: true },
    });
    return NextResponse.json({
      absences,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Error fetching absences', description: error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // extracting data from request
    const { operatorId, date, reason }: AbsenceCreateIF = await req.json();
    // checking if data missing
    if (!operatorId || !date || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    // create new absence
    await prisma.absence.create({
      data: { operatorId, date, reason },
    });
    // return new created object
    return NextResponse.json({ status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Error creating absence', description: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Missing absence ID' },
        { status: 400 }
      );
    }
    // deleting
    await prisma.absence.delete({ where: { id } });
    return NextResponse.json({
      status: 200,
      message: 'Absence deleted successfully',
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Error deleting absence', description: error },
      { status: 500 }
    );
  }
}
