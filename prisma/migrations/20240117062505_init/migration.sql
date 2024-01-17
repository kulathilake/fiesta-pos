/*
  Warnings:

  - You are about to drop the column `portion` on the `billitem` table. All the data in the column will be lost.
  - You are about to drop the `itemprice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `itemprice` DROP FOREIGN KEY `ItemPrice_itemId_fkey`;

-- AlterTable
ALTER TABLE `billitem` DROP COLUMN `portion`,
    MODIFY `qty` INTEGER NOT NULL;

-- DropTable
DROP TABLE `itemprice`;
