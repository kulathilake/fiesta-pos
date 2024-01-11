/*
  Warnings:

  - Added the required column `section` to the `ItemCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `itemcategory` ADD COLUMN `section` ENUM('HOT_KITCHEN', 'BBQ_N_GRILL', 'INDIAN_CUISINE', 'JUICE_BAR') NOT NULL;
