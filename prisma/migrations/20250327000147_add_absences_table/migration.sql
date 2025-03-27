-- CreateTable
CREATE TABLE "Absence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operatorId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "Absence_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operateur" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Absence_operatorId_date_key" ON "Absence"("operatorId", "date");
