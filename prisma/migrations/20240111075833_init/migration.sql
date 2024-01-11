-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `mobile` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OTP` (
    `requestId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `otp` INTEGER NOT NULL,
    `lifetime` INTEGER NOT NULL,
    `isSent` BOOLEAN NOT NULL,
    `sentAt` DATETIME(3) NOT NULL,
    `isUsed` BOOLEAN NOT NULL,
    `usedAt` DATETIME(3) NOT NULL,
    `isExpired` BOOLEAN NOT NULL,

    UNIQUE INDEX `OTP_requestId_key`(`requestId`),
    PRIMARY KEY (`requestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OTP` ADD CONSTRAINT `OTP_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
