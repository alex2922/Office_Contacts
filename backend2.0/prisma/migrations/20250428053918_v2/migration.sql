/*
  Warnings:

  - Added the required column `userId` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contacts` ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `fristName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `message` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `option1` VARCHAR(191) NULL,
    MODIFY `option2` VARCHAR(191) NULL,
    MODIFY `option3` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `option1Name` VARCHAR(191) NULL,
    MODIFY `option2Name` VARCHAR(191) NULL,
    MODIFY `option3Name` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
