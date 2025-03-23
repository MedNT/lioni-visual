-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Poste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isCritical" BOOLEAN NOT NULL,
    "familleId" INTEGER NOT NULL,
    "ligneId" INTEGER,
    CONSTRAINT "Poste_familleId_fkey" FOREIGN KEY ("familleId") REFERENCES "Famille" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Poste_ligneId_fkey" FOREIGN KEY ("ligneId") REFERENCES "Ligne" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Poste" ("familleId", "id", "isCritical", "ligneId", "name") SELECT "familleId", "id", "isCritical", "ligneId", "name" FROM "Poste";
DROP TABLE "Poste";
ALTER TABLE "new_Poste" RENAME TO "Poste";
CREATE UNIQUE INDEX "Poste_name_key" ON "Poste"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
