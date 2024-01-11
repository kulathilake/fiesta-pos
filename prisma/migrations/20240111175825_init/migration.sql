-- CreateTable
CREATE TABLE `BillPayment` (
    `paymentId` INTEGER NOT NULL AUTO_INCREMENT,
    `billId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BillPayment_billId_key`(`billId`),
    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BillPayment` ADD CONSTRAINT `BillPayment_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
