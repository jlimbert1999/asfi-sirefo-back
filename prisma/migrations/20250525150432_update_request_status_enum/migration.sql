/*
  Warnings:

  - The values [pending,completed] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('draft', 'sent', 'rejected', 'accepted');
ALTER TABLE "AsfiFundTransfer" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AsfiRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AsfiRequest" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TABLE "AsfiFundTransfer" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "RequestStatus_old";
ALTER TABLE "AsfiFundTransfer" ALTER COLUMN "status" SET DEFAULT 'draft';
ALTER TABLE "AsfiRequest" ALTER COLUMN "status" SET DEFAULT 'draft';
COMMIT;

-- AlterTable
ALTER TABLE "AsfiFundTransfer" ALTER COLUMN "status" SET DEFAULT 'draft';

-- AlterTable
ALTER TABLE "AsfiRequest" ALTER COLUMN "status" SET DEFAULT 'draft';
