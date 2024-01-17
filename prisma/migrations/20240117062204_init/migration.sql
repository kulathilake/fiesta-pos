-- CreateTable
CREATE TABLE `ItemPrice` (
    `id` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,

    UNIQUE INDEX `ItemPrice_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemPrice` ADD CONSTRAINT `ItemPrice_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
