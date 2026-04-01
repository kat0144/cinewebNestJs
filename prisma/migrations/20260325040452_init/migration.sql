-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassificacaoEtaria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "ClassificacaoEtaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "dataInicioExibicao" TIMESTAMP(3) NOT NULL,
    "dataFinalExibicao" TIMESTAMP(3) NOT NULL,
    "elenco" TEXT,
    "classificacaoEtariaId" INTEGER NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sala" (
    "id" SERIAL NOT NULL,
    "identificacao" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" SERIAL NOT NULL,
    "inicioExibicao" TIMESTAMP(3) NOT NULL,
    "filmeId" INTEGER NOT NULL,
    "salaId" INTEGER NOT NULL,

    CONSTRAINT "Sessao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingresso" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "valorPago" DECIMAL(65,30) NOT NULL,
    "sessaoId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,

    CONSTRAINT "Ingresso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LancheCombo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "qtdItens" INTEGER NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "pedidoId" INTEGER NOT NULL,

    CONSTRAINT "LancheCombo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "qtdInteira" INTEGER,
    "qtdMeia" INTEGER,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorTotal" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Enrollments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Enrollments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "Genero"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "ClassificacaoEtaria_nome_key" ON "ClassificacaoEtaria"("nome");

-- CreateIndex
CREATE INDEX "_Enrollments_B_index" ON "_Enrollments"("B");

-- AddForeignKey
ALTER TABLE "Filme" ADD CONSTRAINT "Filme_classificacaoEtariaId_fkey" FOREIGN KEY ("classificacaoEtariaId") REFERENCES "ClassificacaoEtaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingresso" ADD CONSTRAINT "Ingresso_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "Sessao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingresso" ADD CONSTRAINT "Ingresso_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LancheCombo" ADD CONSTRAINT "LancheCombo_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Enrollments" ADD CONSTRAINT "_Enrollments_A_fkey" FOREIGN KEY ("A") REFERENCES "Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Enrollments" ADD CONSTRAINT "_Enrollments_B_fkey" FOREIGN KEY ("B") REFERENCES "Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
