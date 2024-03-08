/*
  Warnings:

  - You are about to drop the column `kotId` on the `billitem` table. All the data in the column will be lost.
  - You are about to drop the `kitchenticketitems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `kitchenticketitems` DROP FOREIGN KEY `KitchenTicketItems_kotId_fkey`;

-- DropIndex
DROP INDEX `BillItem_kotId_fkey` ON `billitem`;

-- AlterTable
ALTER TABLE `billitem` DROP COLUMN `kotId`;

-- AlterTable
ALTER TABLE `kitchenticket` MODIFY `updatedAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `kitchenticketitems`;

-- CreateTable
CREATE TABLE `KitchenTicketItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `kotId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KitchenTicketItem` ADD CONSTRAINT `KitchenTicketItem_kotId_fkey` FOREIGN KEY (`kotId`) REFERENCES `KitchenTicket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KitchenTicketItem` ADD CONSTRAINT `KitchenTicketItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `BillItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
