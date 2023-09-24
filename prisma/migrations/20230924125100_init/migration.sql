/*
  Warnings:

  - You are about to drop the column `chatContactId` on the `Contact` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_chatContactId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "chatContactId";
