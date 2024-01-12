/*
  Warnings:

  - Added the required column `itemId` to the `BillItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billitem` ADD COLUMN `itemId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BillItem` ADD CONSTRAINT `BillItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
