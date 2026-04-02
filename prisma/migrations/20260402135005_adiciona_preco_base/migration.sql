-- CreateTable
CREATE TABLE "PrecoBase" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "valorInteira" DECIMAL(65,30) NOT NULL,
    "valorMeia" DECIMAL(65,30) NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrecoBase_pkey" PRIMARY KEY ("id")
);
