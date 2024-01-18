/*
  Warnings:

  - Added the required column `qty` to the `KitchenTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kitchenticket` ADD COLUMN `qty` INTEGER NOT NULL;
