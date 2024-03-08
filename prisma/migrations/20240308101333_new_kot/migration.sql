/*
  Warnings:

  - You are about to drop the column `billItemId` on the `kitchenticket` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `kitchenticket` table. All the data in the column will be lost.
  - Added the required column `kotId` to the `BillItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `KitchenTicket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `kitchenticket` DROP FOREIGN KEY `KitchenTicket_billItemId_fkey`;

-- AlterTable
ALTER TABLE `billitem` ADD COLUMN `kotId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `kitchenticket` DROP COLUMN `billItemId`,
    DROP COLUMN `qty`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `BillItem` ADD CONSTRAINT `BillItem_kotId_fkey` FOREIGN KEY (`kotId`) REFERENCES `KitchenTicket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
