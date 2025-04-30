-- CreateEnum
CREATE TYPE "ProccesType" AS ENUM ('R', 'S');

-- CreateTable
CREATE TABLE "Asfi_Requests" (
    "id" SERIAL NOT NULL,
    "authority_position" TEXT NOT NULL,
    "requesting_authority" TEXT NOT NULL,
    "request_code" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "process_type" "ProccesType" NOT NULL,
    "quantity_detail" INTEGER NOT NULL,
    "sent_date" TIMESTAMP(3) NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "Asfi_Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asfi_Files" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "asfi_request_id" INTEGER NOT NULL,

    CONSTRAINT "Asfi_Files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asfi_Requests_request_code_key" ON "Asfi_Requests"("request_code");

-- CreateIndex
CREATE UNIQUE INDEX "Asfi_Files_asfi_request_id_key" ON "Asfi_Files"("asfi_request_id");

-- AddForeignKey
ALTER TABLE "Asfi_Files" ADD CONSTRAINT "Asfi_Files_asfi_request_id_fkey" FOREIGN KEY ("asfi_request_id") REFERENCES "Asfi_Requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
