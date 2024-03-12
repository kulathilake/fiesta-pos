-- CreateTable
CREATE TABLE `Expense` (
    `expenseId` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PURCHASE', 'UTILITY', 'MAINTAINENCE', 'OTHER') NOT NULL,
    `incurredOn` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    PRIMARY KEY (`expenseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
