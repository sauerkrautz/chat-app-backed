/*
  Warnings:

  - You are about to drop the column `userUuid` on the `conversation` table. All the data in the column will be lost.
  - Added the required column `receiver` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `Conversation_userUuid_fkey`;

-- AlterTable
ALTER TABLE `conversation` DROP COLUMN `userUuid`,
    ADD COLUMN `receiver` VARCHAR(191) NOT NULL,
    ADD COLUMN `sender` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_sender_fkey` FOREIGN KEY (`sender`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
