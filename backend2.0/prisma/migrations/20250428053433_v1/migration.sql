-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('CLIENT', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
    `domainAddress` VARCHAR(191) NOT NULL,
    `nameInputStyle` ENUM('SPLIT', 'SINGLE') NOT NULL DEFAULT 'SINGLE',
    `phoneInput` BOOLEAN NOT NULL DEFAULT false,
    `emailNotification` BOOLEAN NOT NULL DEFAULT false,
    `option1` BOOLEAN NOT NULL DEFAULT false,
    `option1Name` VARCHAR(191) NOT NULL,
    `option2` BOOLEAN NOT NULL DEFAULT false,
    `option2Name` VARCHAR(191) NOT NULL,
    `option3` BOOLEAN NOT NULL DEFAULT false,
    `option3Name` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `loginAttempts` INTEGER NOT NULL DEFAULT 0,
    `isLocked` BOOLEAN NOT NULL DEFAULT false,
    `lockUntil` DATETIME(3) NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contacts` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `fristName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `option1` VARCHAR(191) NOT NULL,
    `option2` VARCHAR(191) NOT NULL,
    `option3` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
