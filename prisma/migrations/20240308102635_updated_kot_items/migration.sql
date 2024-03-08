-- DropForeignKey
ALTER TABLE `billitem` DROP FOREIGN KEY `BillItem_kotId_fkey`;

-- CreateTable
CREATE TABLE `KitchenTicketItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kotId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KitchenTicketItems` ADD CONSTRAINT `KitchenTicketItems_kotId_fkey` FOREIGN KEY (`kotId`) REFERENCES `KitchenTicket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
