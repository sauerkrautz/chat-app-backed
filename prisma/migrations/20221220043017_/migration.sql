-- CreateIndex
CREATE INDEX `Conversation_uuid_sender_receiver_idx` ON `Conversation`(`uuid`, `sender`, `receiver`);

-- CreateIndex
CREATE INDEX `Message_uuid_conversationUuid_idx` ON `Message`(`uuid`, `conversationUuid`);

-- CreateIndex
CREATE INDEX `User_email_username_number_idx` ON `User`(`email`, `username`, `number`);
