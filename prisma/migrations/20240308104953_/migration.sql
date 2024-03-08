/*
  Warnings:

  - Added the required column `note` to the `KitchenTicketItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `KitchenTicketItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kitchenticketitem` ADD COLUMN `note` VARCHAR(191) NOT NULL,
    ADD COLUMN `qty` INTEGER NOT NULL;
