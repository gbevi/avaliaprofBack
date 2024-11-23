/*
  Warnings:

  - You are about to drop the column `conteudo` on the `Evaluate` table. All the data in the column will be lost.
  - You are about to drop the column `disciplina` on the `Evaluate` table. All the data in the column will be lost.
  - You are about to drop the column `nomeProfessor` on the `Evaluate` table. All the data in the column will be lost.
  - Added the required column `content` to the `Evaluate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Evaluate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherName` to the `Evaluate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evaluate" DROP COLUMN "conteudo",
DROP COLUMN "disciplina",
DROP COLUMN "nomeProfessor",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "teacherName" TEXT NOT NULL;
