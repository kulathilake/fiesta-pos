/*
  Warnings:

  - Added the required column `hashedPin` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `hashedPin` VARCHAR(191) NOT NULL;
