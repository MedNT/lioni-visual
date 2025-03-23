-- CreateTable
CREATE TABLE "Famille" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ligne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "familleId" INTEGER NOT NULL,
    CONSTRAINT "Ligne_familleId_fkey" FOREIGN KEY ("familleId") REFERENCES "Famille" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Poste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isCritical" BOOLEAN NOT NULL,
    "familleId" INTEGER NOT NULL,
    "ligneId" INTEGER NOT NULL,
    CONSTRAINT "Poste_familleId_fkey" FOREIGN KEY ("familleId") REFERENCES "Famille" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Poste_ligneId_fkey" FOREIGN KEY ("ligneId") REFERENCES "Ligne" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Operateur" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "isPolyvalent" BOOLEAN NOT NULL,
    "posteId" INTEGER NOT NULL,
    CONSTRAINT "Operateur_posteId_fkey" FOREIGN KEY ("posteId") REFERENCES "Poste" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Famille_name_key" ON "Famille"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ligne_name_key" ON "Ligne"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Poste_name_key" ON "Poste"("name");
