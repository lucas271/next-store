/*
  Warnings:

  - A unique constraint covering the columns `[review_id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `review_id` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "review_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_review_id_key" ON "Rating"("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_key" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_name_key" ON "User"("id", "name");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_userName_fkey" FOREIGN KEY ("userId", "userName") REFERENCES "User"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
