-- AlterTable
ALTER TABLE `billpayment` MODIFY `mode` ENUM('CASH', 'CARD', 'BANK') NOT NULL;
