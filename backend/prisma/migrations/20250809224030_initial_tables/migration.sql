-- CreateEnum
CREATE TYPE "public"."PlanName" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "public"."ListRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('ptBR', 'enUS');

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "planId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plans" (
    "id" TEXT NOT NULL,
    "name" "public"."PlanName" NOT NULL,
    "maxListsUserCanBe" INTEGER,
    "maxItemsPerList" INTEGER,
    "maxCustomItemsPerUser" INTEGER,
    "maxUsersPerList" INTEGER,
    "whisperMinutesPerMonth" INTEGER,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listMembers" (
    "listId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "role" "public"."ListRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listMembers_pkey" PRIMARY KEY ("listId","profileId")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "defaultName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categoryTranslations" (
    "name" TEXT NOT NULL,
    "language" "public"."Language" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoryTranslations_pkey" PRIMARY KEY ("categoryId","language")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "defaultName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productTranslations" (
    "name" TEXT NOT NULL,
    "language" "public"."Language" NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productTranslations_pkey" PRIMARY KEY ("productId","language")
);

-- CreateTable
CREATE TABLE "public"."userCustomProducts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userCustomProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listItems" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "addedBy" TEXT NOT NULL,
    "productId" TEXT,
    "customProductId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listInvites" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "usedBy" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "profileId" TEXT,

    CONSTRAINT "listInvites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_clerkUserId_key" ON "public"."profiles"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "plans_name_key" ON "public"."plans"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_defaultName_key" ON "public"."categories"("defaultName");

-- CreateIndex
CREATE UNIQUE INDEX "products_defaultName_key" ON "public"."products"("defaultName");

-- CreateIndex
CREATE UNIQUE INDEX "listInvites_token_key" ON "public"."listInvites"("token");

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lists" ADD CONSTRAINT "lists_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listMembers" ADD CONSTRAINT "listMembers_listId_fkey" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listMembers" ADD CONSTRAINT "listMembers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categoryTranslations" ADD CONSTRAINT "categoryTranslations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productTranslations" ADD CONSTRAINT "productTranslations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userCustomProducts" ADD CONSTRAINT "userCustomProducts_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listItems" ADD CONSTRAINT "listItems_listId_fkey" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listItems" ADD CONSTRAINT "listItems_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listItems" ADD CONSTRAINT "listItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listItems" ADD CONSTRAINT "listItems_customProductId_fkey" FOREIGN KEY ("customProductId") REFERENCES "public"."userCustomProducts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listInvites" ADD CONSTRAINT "listInvites_listId_fkey" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listInvites" ADD CONSTRAINT "listInvites_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listInvites" ADD CONSTRAINT "listInvites_usedBy_fkey" FOREIGN KEY ("usedBy") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listInvites" ADD CONSTRAINT "listInvites_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
