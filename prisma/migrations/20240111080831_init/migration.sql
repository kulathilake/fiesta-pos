/*
  Warnings:

  - The primary key for the `otp` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `otp` DROP PRIMARY KEY,
    MODIFY `requestId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`requestId`);
