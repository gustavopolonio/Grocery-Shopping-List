-- DropForeignKey
ALTER TABLE "public"."categoryTranslations" DROP CONSTRAINT "categoryTranslations_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."listInvites" DROP CONSTRAINT "listInvites_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."listMembers" DROP CONSTRAINT "listMembers_listId_fkey";

-- DropForeignKey
ALTER TABLE "public"."listMembers" DROP CONSTRAINT "listMembers_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."userCustomProducts" DROP CONSTRAINT "userCustomProducts_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "public"."listMembers" ADD CONSTRAINT "listMembers_listId_fkey" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listMembers" ADD CONSTRAINT "listMembers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categoryTranslations" ADD CONSTRAINT "categoryTranslations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userCustomProducts" ADD CONSTRAINT "userCustomProducts_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listInvites" ADD CONSTRAINT "listInvites_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
