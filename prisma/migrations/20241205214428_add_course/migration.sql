/*
  Warnings:

  - Added the required column `UserId` to the `Evaluate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evaluate" ADD COLUMN     "UserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "course" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Evaluate" ADD CONSTRAINT "Evaluate_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
