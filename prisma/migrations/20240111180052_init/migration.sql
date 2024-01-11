/*
  Warnings:

  - Added the required column `balance` to the `BillPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode` to the `BillPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidAt` to the `BillPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tendered` to the `BillPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `BillPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billpayment` ADD COLUMN `balance` DOUBLE NOT NULL,
    ADD COLUMN `mode` ENUM('CASH', 'CARD') NOT NULL,
    ADD COLUMN `paidAt` DATETIME(3) NOT NULL,
    ADD COLUMN `tendered` DOUBLE NOT NULL,
    ADD COLUMN `total` DOUBLE NOT NULL;
