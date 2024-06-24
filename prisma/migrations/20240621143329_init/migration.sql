-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "asgId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_name_key" ON "Assignment"("name");

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_asgId_fkey" FOREIGN KEY ("asgId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
