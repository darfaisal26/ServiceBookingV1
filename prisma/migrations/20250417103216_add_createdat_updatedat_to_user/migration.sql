/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- Step 1: Add columns as nullable first
ALTER TABLE `User` 
ADD COLUMN `createdAt` DATETIME(3) NULL,
ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- Step 2: Set values for existing records
UPDATE `User` SET 
  `createdAt` = CURRENT_TIMESTAMP(3),
  `updatedAt` = CURRENT_TIMESTAMP(3);

-- Step 3: Add NOT NULL constraints and defaults
ALTER TABLE `User` 
MODIFY COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
MODIFY COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3);
