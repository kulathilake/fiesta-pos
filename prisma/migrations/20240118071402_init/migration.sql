/*
  Warnings:

  - Added the required column `billId` to the `KitchenTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuedAt` to the `KitchenTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kitchenticket` ADD COLUMN `billId` VARCHAR(191) NOT NULL,
    ADD COLUMN `issuedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('RECIEVED', 'PREPARING', 'DISPATCHED') NOT NULL DEFAULT 'RECIEVED';

-- AddForeignKey
ALTER TABLE `KitchenTicket` ADD CONSTRAINT `KitchenTicket_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
