-- DropIndex
DROP INDEX `Conversation_uuid_sender_receiver_idx` ON `conversation`;

-- CreateIndex
CREATE INDEX `Conversation_sender_receiver_idx` ON `Conversation`(`sender`, `receiver`);
