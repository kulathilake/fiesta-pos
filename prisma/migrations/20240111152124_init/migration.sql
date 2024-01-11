/*
  Warnings:

  - You are about to drop the column `isExpired` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `lifetime` on the `otp` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `otp` DROP COLUMN `isExpired`,
    DROP COLUMN `lifetime`,
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL;
