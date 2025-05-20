-- CreateEnum
CREATE TYPE "ProcessType" AS ENUM ('R', 'S');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'completed');

-- CreateTable
CREATE TABLE "AsfiRequest" (
    "id" TEXT NOT NULL,
    "authorityPosition" TEXT NOT NULL,
    "requestingAuthority" TEXT NOT NULL,
    "requestId" SERIAL NOT NULL,
    "requestCode" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "quantityDetail" INTEGER NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "circularNumber" TEXT,
    "processType" "ProcessType" NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "AsfiRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsfiFundTransfer" (
    "id" TEXT NOT NULL,
    "authorityPosition" TEXT NOT NULL,
    "requestingAuthority" TEXT NOT NULL,
    "requestId" SERIAL NOT NULL,
    "requestCode" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "quantityDetail" INTEGER NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "circularNumber" TEXT,
    "asfiRequestId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "AsfiFundTransfer_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "AsfiRequest_requestId_key" ON "AsfiRequest"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "AsfiRequest_requestCode_key" ON "AsfiRequest"("requestCode");

-- CreateIndex
CREATE UNIQUE INDEX "AsfiFundTransfer_requestId_key" ON "AsfiFundTransfer"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "AsfiFundTransfer_requestCode_key" ON "AsfiFundTransfer"("requestCode");

-- CreateIndex
CREATE UNIQUE INDEX "AsfiRequestFile_asfiRequestId_key" ON "AsfiRequestFile"("asfiRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "AsfiTransferFile_asfiFundTransferId_key" ON "AsfiTransferFile"("asfiFundTransferId");

-- AddForeignKey
ALTER TABLE "AsfiFundTransfer" ADD CONSTRAINT "AsfiFundTransfer_asfiRequestId_fkey" FOREIGN KEY ("asfiRequestId") REFERENCES "AsfiRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsfiRequestFile" ADD CONSTRAINT "AsfiRequestFile_asfiRequestId_fkey" FOREIGN KEY ("asfiRequestId") REFERENCES "AsfiRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsfiTransferFile" ADD CONSTRAINT "AsfiTransferFile_asfiFundTransferId_fkey" FOREIGN KEY ("asfiFundTransferId") REFERENCES "AsfiFundTransfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
