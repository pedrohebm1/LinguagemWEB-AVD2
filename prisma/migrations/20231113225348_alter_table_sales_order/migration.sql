/*
  Warnings:

  - Added the required column `clientId` to the `salesOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "salesOrders" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "salesOrders" ADD CONSTRAINT "salesOrders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
