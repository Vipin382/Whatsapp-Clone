-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_useTwoId_fkey";

-- CreateTable
CREATE TABLE "ChatContact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "profile" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatContact_name_phone_idx" ON "ChatContact"("name", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "ChatContact_id_phone_key" ON "ChatContact"("id", "phone");

-- AddForeignKey
ALTER TABLE "ChatContact" ADD CONSTRAINT "ChatContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_useTwoId_fkey" FOREIGN KEY ("useTwoId") REFERENCES "ChatContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
