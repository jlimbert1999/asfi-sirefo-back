/*
  Warnings:

  - The `status` column on the `AsfiFundTransfer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `AsfiRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AsfiRequestStatus" AS ENUM ('draft', 'sent', 'rejected', 'accepted');

-- AlterTable
ALTER TABLE "AsfiFundTransfer" DROP COLUMN "status",
ADD COLUMN     "status" "AsfiRequestStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "AsfiRequest" DROP COLUMN "status",
ADD COLUMN     "status" "AsfiRequestStatus" NOT NULL DEFAULT 'draft';

-- DropEnum
DROP TYPE "RequestStatus";
