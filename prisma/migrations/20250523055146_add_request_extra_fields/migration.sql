/*
  Warnings:

  - Made the column `userId` on table `AsfiFundTransfer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `AsfiRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AsfiFundTransfer" DROP CONSTRAINT "AsfiFundTransfer_userId_fkey";

-- DropForeignKey
ALTER TABLE "AsfiRequest" DROP CONSTRAINT "AsfiRequest_userId_fkey";

-- AlterTable
ALTER TABLE "AsfiFundTransfer" ADD COLUMN     "circularDate" TIMESTAMP(3),
ADD COLUMN     "processingStatus" TEXT,
ADD COLUMN     "sendErrorMessage" TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "AsfiRequest" ADD COLUMN     "circularDate" TIMESTAMP(3),
ADD COLUMN     "processingStatus" TEXT,
ADD COLUMN     "sendErrorMessage" TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roles" SET DEFAULT ARRAY['employee']::TEXT[];

-- AddForeignKey
ALTER TABLE "AsfiRequest" ADD CONSTRAINT "AsfiRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsfiFundTransfer" ADD CONSTRAINT "AsfiFundTransfer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
