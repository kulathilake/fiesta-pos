/*
  Warnings:

  - You are about to drop the column `typeOverride` on the `kitchenticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `kitchenticket` DROP COLUMN `typeOverride`;

-- AlterTable
ALTER TABLE `kitchenticketitem` MODIFY `note` VARCHAR(191) NULL;
