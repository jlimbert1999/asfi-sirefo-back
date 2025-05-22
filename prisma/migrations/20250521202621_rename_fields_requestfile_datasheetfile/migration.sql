/*
  Warnings:

  - You are about to drop the column `spreadsheetFilename` on the `AsfiFundTransfer` table. All the data in the column will be lost.
  - You are about to drop the column `spreadsheetFilename` on the `AsfiRequest` table. All the data in the column will be lost.
  - You are about to drop the `AsfiRequestFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AsfiTransferFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AsfiRequestFile" DROP CONSTRAINT "AsfiRequestFile_asfiRequestId_fkey";

-- DropForeignKey
ALTER TABLE "AsfiTransferFile" DROP CONSTRAINT "AsfiTransferFile_asfiFundTransferId_fkey";

-- AlterTable
ALTER TABLE "AsfiFundTransfer" DROP COLUMN "spreadsheetFilename",
ADD COLUMN     "dataSheetFile" TEXT,
ADD COLUMN     "requestFile" TEXT;

-- AlterTable
ALTER TABLE "AsfiRequest" DROP COLUMN "spreadsheetFilename",
ADD COLUMN     "dataSheetFile" TEXT,
ADD COLUMN     "requestFile" TEXT;

-- DropTable
DROP TABLE "AsfiRequestFile";

-- DropTable
DROP TABLE "AsfiTransferFile";
