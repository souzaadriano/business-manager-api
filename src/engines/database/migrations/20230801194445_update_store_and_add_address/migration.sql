/*
  Warnings:

  - You are about to drop the column `updateAt` on the `stores` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stores" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exception_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "exception_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_profile" (
    "storeId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "store_profile_pkey" PRIMARY KEY ("storeId")
);

-- AddForeignKey
ALTER TABLE "store_profile" ADD CONSTRAINT "store_profile_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_profile" ADD CONSTRAINT "store_profile_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
