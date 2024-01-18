-- CreateTable
CREATE TABLE `KitchenTicket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `billItemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KitchenTicket` ADD CONSTRAINT `KitchenTicket_billItemId_fkey` FOREIGN KEY (`billItemId`) REFERENCES `BillItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
