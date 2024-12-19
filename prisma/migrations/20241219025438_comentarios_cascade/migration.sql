-- DropForeignKey
ALTER TABLE "Comentarios" DROP CONSTRAINT "Comentarios_avaliacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Comentarios" DROP CONSTRAINT "Comentarios_userId_fkey";

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Evaluate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
