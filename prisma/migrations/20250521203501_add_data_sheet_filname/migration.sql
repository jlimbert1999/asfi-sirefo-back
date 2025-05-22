/*
  Warnings:

  - You are about to drop the column `requestFile` on the `AsfiFundTransfer` table. All the data in the column will be lost.
  - You are about to drop the column `requestFile` on the `AsfiRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AsfiFundTransfer" DROP COLUMN "requestFile";

-- AlterTable
ALTER TABLE "AsfiRequest" DROP COLUMN "requestFile";

-- CreateTable
CREATE TABLE "AsfiRequestFile" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "asfiRequestId" TEXT NOT NULL,

    CONSTRAINT "AsfiRequestFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsfiTransferFile" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "asfiFundTransferId" TEXT NOT NULL,

    CONSTRAINT "AsfiTransferFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AsfiRequestFile_asfiRequestId_key" ON "AsfiRequestFile"("asfiRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "AsfiTransferFile_asfiFundTransferId_key" ON "AsfiTransferFile"("asfiFundTransferId");

-- AddForeignKey
ALTER TABLE "AsfiRequestFile" ADD CONSTRAINT "AsfiRequestFile_asfiRequestId_fkey" FOREIGN KEY ("asfiRequestId") REFERENCES "AsfiRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsfiTransferFile" ADD CONSTRAINT "AsfiTransferFile_asfiFundTransferId_fkey" FOREIGN KEY ("asfiFundTransferId") REFERENCES "AsfiFundTransfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
