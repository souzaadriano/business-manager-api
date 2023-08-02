/*
  Warnings:

  - Added the required column `owner` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "owner" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
