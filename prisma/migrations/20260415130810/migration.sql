/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `LancheCombo` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `LancheCombo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identificacao]` on the table `Sala` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Ingresso" DROP CONSTRAINT "Ingresso_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "LancheCombo" DROP CONSTRAINT "LancheCombo_pedidoId_fkey";

-- AlterTable
ALTER TABLE "LancheCombo" DROP COLUMN "pedidoId",
DROP COLUMN "total";

-- CreateTable
CREATE TABLE "_LancheComboToPedido" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LancheComboToPedido_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LancheComboToPedido_B_index" ON "_LancheComboToPedido"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Sala_identificacao_key" ON "Sala"("identificacao");

-- AddForeignKey
ALTER TABLE "Ingresso" ADD CONSTRAINT "Ingresso_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LancheComboToPedido" ADD CONSTRAINT "_LancheComboToPedido_A_fkey" FOREIGN KEY ("A") REFERENCES "LancheCombo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LancheComboToPedido" ADD CONSTRAINT "_LancheComboToPedido_B_fkey" FOREIGN KEY ("B") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;
