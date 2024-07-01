-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "asgId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_title_key" ON "Assignment"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Scores_studentId_asgId_key" ON "Scores"("studentId", "asgId");

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_asgId_fkey" FOREIGN KEY ("asgId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
