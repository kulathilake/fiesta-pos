/*
  Warnings:

  - Added the required column `trans` to the `InventoryCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InventoryCategory` ADD COLUMN `trans` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `InventoryItem` ADD COLUMN `photo` VARCHAR(191) NOT NULL;
