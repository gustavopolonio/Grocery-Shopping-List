-- DropForeignKey
ALTER TABLE "public"."UserCustomProductCategory" DROP CONSTRAINT "UserCustomProductCategory_userCustomProductId_fkey";

-- AlterTable
ALTER TABLE "public"."UserCustomProductCategory" ADD COLUMN     "productId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."UserCustomProductCategory" ADD CONSTRAINT "UserCustomProductCategory_userCustomProductId_fkey" FOREIGN KEY ("userCustomProductId") REFERENCES "public"."userCustomProducts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCustomProductCategory" ADD CONSTRAINT "UserCustomProductCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
