/*
  Warnings:

  - A unique constraint covering the columns `[sender]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiver]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Conversation_sender_key` ON `Conversation`(`sender`);

-- CreateIndex
CREATE UNIQUE INDEX `Conversation_receiver_key` ON `Conversation`(`receiver`);
