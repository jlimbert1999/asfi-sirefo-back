/*
  Warnings:

  - You are about to drop the column `employeeId` on the `AsfiCredentials` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `AsfiCredentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AsfiCredentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AsfiCredentials" DROP CONSTRAINT "AsfiCredentials_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropIndex
DROP INDEX "AsfiCredentials_employeeId_key";

-- AlterTable
ALTER TABLE "AsfiCredentials" DROP COLUMN "employeeId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AsfiFundTransfer" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "AsfiRequest" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;

-- DropTable
DROP TABLE "Employee";

-- CreateIndex
CREATE UNIQUE INDEX "AsfiCredentials_userId_key" ON "AsfiCredentials"("userId");

-- AddForeignKey
ALTER TABLE "AsfiRequest" ADD CONSTRAINT "AsfiRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsfiFundTransfer" ADD CONSTRAINT "AsfiFundTransfer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsfiCredentials" ADD CONSTRAINT "AsfiCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
