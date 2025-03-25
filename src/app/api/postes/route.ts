import { prisma } from '@/db/prisma';
import { PosteIF } from '@/utils/types';
import { Poste } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const postes: Poste[] = await prisma.poste.findMany();
  const response: PosteIF[] = JSON.parse(JSON.stringify(postes));
  return NextResponse.json({
    postes: response,
  });
}