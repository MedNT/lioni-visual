import { prisma } from '@/db/prisma';
import { PosteIF } from '@/utils/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const postes: PosteIF[] = await prisma.poste.findMany();
  return NextResponse.json({ postes });
}
