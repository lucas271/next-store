/*
  Warnings:

  - A unique constraint covering the columns `[userId,product_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Review_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_product_id_key" ON "Review"("userId", "product_id");
