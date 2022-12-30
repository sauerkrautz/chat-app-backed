-- CreateIndex
CREATE INDEX `Conversation_sender_receiver_idx` ON `Conversation`(`sender`, `receiver`);
