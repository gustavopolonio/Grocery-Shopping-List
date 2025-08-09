/*
  Warnings:

  - A unique constraint covering the columns `[defaultName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[defaultName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Plan" ALTER COLUMN "maxListsUserCanBe" DROP NOT NULL,
ALTER COLUMN "maxItemsPerList" DROP NOT NULL,
ALTER COLUMN "maxCustomItemsPerUser" DROP NOT NULL,
ALTER COLUMN "maxUsersPerList" DROP NOT NULL,
ALTER COLUMN "whisperMinutesPerMonth" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_defaultName_key" ON "public"."Category"("defaultName");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "public"."Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_defaultName_key" ON "public"."Product"("defaultName");
