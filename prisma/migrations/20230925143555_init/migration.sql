-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_useTwoId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_useTwoId_fkey" FOREIGN KEY ("useTwoId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
