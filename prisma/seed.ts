import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedData() {
  // Disable foreign key constraints
  await prisma.$executeRaw`PRAGMA foreign_keys = OFF;`;

  // Delete data from all tables
  await prisma.$executeRaw`DELETE FROM "Famille";`;
  await prisma.$executeRaw`DELETE FROM "Ligne";`;
  await prisma.$executeRaw`DELETE FROM "Poste";`;
  await prisma.$executeRaw`DELETE FROM "Operateur";`;

  // Enable foreign key constraints again
  await prisma.$executeRaw`PRAGMA foreign_keys = ON;`;

  // Insert familles
  const abs4wd = await prisma.famille.create({ data: { name: 'ABS 4WD' } });
  const abs2wd = await prisma.famille.create({ data: { name: 'ABS 2WD' } });
  const hev = await prisma.famille.create({ data: { name: 'HEV' } });
  const egrIce = await prisma.famille.create({ data: { name: 'EGR ICE' } });

  // ------------------------ ABS 4WD ---------------------------------

  // Insert postes
  const assemblageAbs4wd = await prisma.poste.create({
    data: { name: 'Assemblage', isCritical: true, familleId: abs4wd.id },
  });
  const self1 = await prisma.poste.create({
    data: { name: 'Self 1', isCritical: true, familleId: abs4wd.id },
  });
  const self2 = await prisma.poste.create({
    data: { name: 'Self 2', isCritical: true, familleId: abs4wd.id },
  });
  const backupAbs4wd = await prisma.poste.create({
    data: { name: 'Backup', isCritical: true, familleId: abs4wd.id },
  });
  // Insert operateurs
  await prisma.operateur.createMany({
    data: [
      {
        nom: 'Ilham',
        prenom: 'Bhouihy',
        isPolyvalent: false,
        posteId: assemblageAbs4wd.id,
      },
      {
        nom: 'Samira',
        prenom: 'Bennour',
        isPolyvalent: false,
        posteId: assemblageAbs4wd.id,
      },
      {
        nom: 'Meryem',
        prenom: 'Zarrouk',
        isPolyvalent: false,
        posteId: self1.id,
      },
      {
        nom: 'Youssef',
        prenom: 'Ouahham',
        isPolyvalent: false,
        posteId: self2.id,
      },
      {
        nom: 'Fatimezzahra',
        prenom: 'Salah',
        isPolyvalent: true,
        posteId: backupAbs4wd.id,
      },
    ],
  });

  // ------------------------ ABS 2WD ---------------------------------

  // Insert postes
  const assemblageAbs2wd = await prisma.poste.create({
    data: { name: 'Assemblage', isCritical: true, familleId: abs2wd.id },
  });
  const bolElec = await prisma.poste.create({
    data: { name: 'Bol Eléctrique', isCritical: true, familleId: abs2wd.id },
  });
  const backupAbs2wd = await prisma.poste.create({
    data: { name: 'Backup', isCritical: true, familleId: abs2wd.id },
  });
  // Insert operateurs
  await prisma.operateur.createMany({
    data: [
      {
        nom: 'Mohamed',
        prenom: 'Mouqla',
        isPolyvalent: false,
        posteId: assemblageAbs2wd.id,
      },
      {
        nom: 'Mehdi',
        prenom: 'Ben Mbarek',
        isPolyvalent: false,
        posteId: assemblageAbs2wd.id,
      },
      {
        nom: 'Meryem',
        prenom: 'Ranikh',
        isPolyvalent: false,
        posteId: assemblageAbs2wd.id,
      },
      {
        nom: 'Jihane',
        prenom: 'Benrayess',
        isPolyvalent: false,
        posteId: assemblageAbs2wd.id,
      },
      {
        nom: 'Meryem',
        prenom: 'Oughriss',
        isPolyvalent: false,
        posteId: assemblageAbs2wd.id,
      },
      {
        nom: 'Zouhair',
        prenom: 'Bensamka',
        isPolyvalent: false,
        posteId: bolElec.id,
      },
      {
        nom: 'Ikhlas',
        prenom: 'Falahi',
        isPolyvalent: false,
        posteId: assemblageAbs2wd.id,
      },
      {
        nom: 'Wafae',
        prenom: 'Qossay',
        isPolyvalent: false,
        posteId: assemblageAbs2wd.id,
      },
      {
        nom: 'Mestapha',
        prenom: 'Nait Gourma',
        isPolyvalent: false,
        posteId: assemblageAbs2wd.id,
      },
      {
        nom: 'Abdelhaq',
        prenom: 'Ezzarouali',
        isPolyvalent: false,
        posteId: bolElec.id,
      },
      {
        nom: 'Fatimezzahra',
        prenom: 'Salah',
        isPolyvalent: true,
        posteId: backupAbs2wd.id,
      },
    ],
  });

  // ------------------------ HEV ---------------------------------

  // Insert lignes
  const ligne1 = await prisma.ligne.create({
    data: { name: 'Ligne 1', familleId: hev.id },
  });
  const ligne2 = await prisma.ligne.create({
    data: { name: 'Ligne 2', familleId: hev.id },
  });
  // Insert postes
  const poste8 = await prisma.poste.create({
    data: {
      name: 'Post 8',
      isCritical: true,
      familleId: hev.id,
      ligneId: ligne1.id,
    },
  });
  const poste21 = await prisma.poste.create({
    data: {
      name: 'Post 21',
      isCritical: true,
      familleId: hev.id,
      ligneId: ligne1.id,
    },
  });
  const poste16 = await prisma.poste.create({
    data: {
      name: 'Post 16',
      isCritical: true,
      familleId: hev.id,
      ligneId: ligne2.id,
    },
  });
  const poste26 = await prisma.poste.create({
    data: {
      name: 'Post 26',
      isCritical: true,
      familleId: hev.id,
      ligneId: ligne2.id,
    },
  });
  const backupHEV = await prisma.poste.create({
    data: { name: 'Backup', isCritical: true, familleId: hev.id },
  });
  // Insert operateurs
  await prisma.operateur.createMany({
    data: [
      {
        nom: 'Tarik',
        prenom: 'Fekak',
        isPolyvalent: false,
        posteId: poste8.id,
      },
      {
        nom: 'Habiba',
        prenom: '',
        isPolyvalent: false,
        posteId: poste21.id,
      },
      {
        nom: 'Najoua',
        prenom: 'Adnani',
        isPolyvalent: false,
        posteId: backupHEV.id,
      },
      {
        nom: 'Saida',
        prenom: 'El Boudi',
        isPolyvalent: false,
        posteId: poste16.id,
      },
      {
        nom: 'Siham',
        prenom: '',
        isPolyvalent: false,
        posteId: poste26.id,
      },
      {
        nom: 'Assma',
        prenom: 'Hamdani',
        isPolyvalent: false,
        posteId: backupHEV.id,
      },
    ],
  });

  // ------------------------ EGR ICE ---------------------------------
  const ligne1_egr = await prisma.ligne.create({
    data: { name: 'Ligne 1', familleId: egrIce.id },
  });
  const ligne2_egr = await prisma.ligne.create({
    data: { name: 'Ligne 2', familleId: egrIce.id },
  });
  // insert postes
  const poste10Ligne1 = await prisma.poste.create({
    data: {
      name: 'Post 10',
      isCritical: true,
      familleId: egrIce.id,
      ligneId: ligne1_egr.id,
    },
  });
  const poste14Ligne1 = await prisma.poste.create({
    data: {
      name: 'Post 14',
      isCritical: true,
      familleId: egrIce.id,
      ligneId: ligne1_egr.id,
    },
  });
  const poste10Ligne2 = await prisma.poste.create({
    data: {
      name: 'Post 10',
      isCritical: true,
      familleId: egrIce.id,
      ligneId: ligne2_egr.id,
    },
  });
  const poste14Ligne2 = await prisma.poste.create({
    data: {
      name: 'Post 14',
      isCritical: true,
      familleId: egrIce.id,
      ligneId: ligne2_egr.id,
    },
  });
  const backupEgr = await prisma.poste.create({
    data: { name: 'Backup', isCritical: true, familleId: egrIce.id },
  });
  // Insert operateurs
  await prisma.operateur.createMany({
    data: [
      {
        nom: 'Meryem',
        prenom: 'Ermich',
        isPolyvalent: false,
        posteId: poste10Ligne1.id,
      },
      {
        nom: 'Omar',
        prenom: 'Taleb',
        isPolyvalent: false,
        posteId: poste14Ligne1.id,
      },
      {
        nom: 'Hakima',
        prenom: 'Taleb',
        isPolyvalent: false,
        posteId: backupEgr.id,
      },
      {
        nom: 'Youssef',
        prenom: 'El Boudi',
        isPolyvalent: false,
        posteId: poste10Ligne2.id,
      },
      {
        nom: 'Moussa',
        prenom: 'Ettoumi',
        isPolyvalent: false,
        posteId: poste14Ligne2.id,
      },
    ],
  });

  console.log('Seeding complete!');
}

seedData()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
