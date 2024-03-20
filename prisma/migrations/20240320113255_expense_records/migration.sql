/*
  Warnings:

  - You are about to drop the column `description` on the `expense` table. All the data in the column will be lost.
  - Added the required column `billId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Expense` DROP COLUMN `description`,
    ADD COLUMN `billId` VARCHAR(191) NOT NULL,
    ADD COLUMN `comment` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `DailyRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `openingTime` DATETIME(3) NOT NULL,
    `endingTime` DATETIME(3) NULL,
    `totalSales` DOUBLE NULL,
    `totalExpenses` DOUBLE NULL,
    `openingCashBalance` DOUBLE NOT NULL,
    `actualCashBalance` DOUBLE NULL,
    `toCashLodge` DOUBLE NULL,
    `toCashDrawer` DOUBLE NULL,
    `openedBy` VARCHAR(191) NULL,
    `closedBy` VARCHAR(191) NULL,

    UNIQUE INDEX `DailyRecord_date_key`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
