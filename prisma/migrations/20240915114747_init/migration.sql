/*
  Warnings:

  - You are about to drop the column `mailSRC` on the `Creditor` table. All the data in the column will be lost.
  - Added the required column `imgURL` to the `Creditor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creditor" DROP COLUMN "mailSRC",
ADD COLUMN     "imgURL" TEXT NOT NULL;
