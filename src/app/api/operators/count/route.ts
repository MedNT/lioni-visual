import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const operatorsCount = await prisma.operateur.count();
  return NextResponse.json({
    count: operatorsCount
  });
}