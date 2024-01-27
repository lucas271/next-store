-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_name_fkey";

-- DropIndex
DROP INDEX "Product_category_name_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "category_name" DROP NOT NULL,
ALTER COLUMN "brand_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
