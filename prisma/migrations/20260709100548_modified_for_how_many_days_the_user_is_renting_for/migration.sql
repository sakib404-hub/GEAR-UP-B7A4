/*
  Warnings:

  - You are about to drop the column `endDate` on the `RentalOrders` table. All the data in the column will be lost.
  - Added the required column `rentalDays` to the `RentalOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentalOrders" DROP COLUMN "endDate",
ADD COLUMN     "rentalDays" INTEGER NOT NULL;
