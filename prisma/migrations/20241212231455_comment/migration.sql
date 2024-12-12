-- CreateTable
CREATE TABLE "Comentarios" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avaliacaoId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Evaluate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
