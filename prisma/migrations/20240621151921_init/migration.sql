/*
  Warnings:

  - You are about to drop the column `name` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Scores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,asgId]` on the table `Scores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Scores` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Scores" DROP CONSTRAINT "Scores_userId_fkey";

-- DropIndex
DROP INDEX "Assignment_name_key";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Scores" DROP COLUMN "userId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_title_key" ON "Assignment"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Scores_studentId_asgId_key" ON "Scores"("studentId", "asgId");

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
