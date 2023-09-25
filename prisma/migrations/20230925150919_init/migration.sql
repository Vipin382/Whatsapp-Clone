-- DropIndex
DROP INDEX "Message_userOneId_idx";

-- DropIndex
DROP INDEX "Message_userOneId_useTwoId_key";

-- CreateIndex
CREATE INDEX "Message_userOneId_useTwoId_idx" ON "Message"("userOneId", "useTwoId");
