/*
  Warnings:

  - You are about to drop the column `imgURL` on the `Creditor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "value" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Creditor" DROP COLUMN "imgURL",
ADD COLUMN     "imageURL" TEXT,
ALTER COLUMN "title" DROP NOT NULL;
