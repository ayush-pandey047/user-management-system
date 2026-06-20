-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `primaryMobile` VARCHAR(10) NOT NULL,
    `secondaryMobile` VARCHAR(10) NULL,
    `aadhaar` VARCHAR(12) NOT NULL,
    `pan` VARCHAR(10) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `placeOfBirth` VARCHAR(150) NOT NULL,
    `currentAddress` TEXT NOT NULL,
    `permanentAddress` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `version` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_aadhaar_key`(`aadhaar`),
    UNIQUE INDEX `users_pan_key`(`pan`),
    INDEX `users_isDeleted_idx`(`isDeleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
