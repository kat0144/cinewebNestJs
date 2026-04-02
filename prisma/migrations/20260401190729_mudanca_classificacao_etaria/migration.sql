/*
  Warnings:

  - You are about to drop the column `classificacaoEtariaId` on the `Filme` table. All the data in the column will be lost.
  - You are about to drop the `ClassificacaoEtaria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Enrollments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classificacaoEtaria` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `Ingresso` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoIngresso" AS ENUM ('INTEIRA', 'MEIA');

-- CreateEnum
CREATE TYPE "Classificacao" AS ENUM ('LIVRE', 'DEZ', 'DOZE', 'QUATORZE', 'DEZESSEIS', 'DEZOITO');

-- DropForeignKey
ALTER TABLE "Filme" DROP CONSTRAINT "Filme_classificacaoEtariaId_fkey";

-- DropForeignKey
ALTER TABLE "_Enrollments" DROP CONSTRAINT "_Enrollments_A_fkey";

-- DropForeignKey
ALTER TABLE "_Enrollments" DROP CONSTRAINT "_Enrollments_B_fkey";

-- AlterTable
ALTER TABLE "Filme" DROP COLUMN "classificacaoEtariaId",
ADD COLUMN     "classificacaoEtaria" "Classificacao" NOT NULL;

-- AlterTable
ALTER TABLE "Ingresso" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoIngresso" NOT NULL;

-- DropTable
DROP TABLE "ClassificacaoEtaria";

-- DropTable
DROP TABLE "_Enrollments";

-- CreateTable
CREATE TABLE "_FilmesGenero" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FilmesGenero_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FilmesGenero_B_index" ON "_FilmesGenero"("B");

-- AddForeignKey
ALTER TABLE "_FilmesGenero" ADD CONSTRAINT "_FilmesGenero_A_fkey" FOREIGN KEY ("A") REFERENCES "Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmesGenero" ADD CONSTRAINT "_FilmesGenero_B_fkey" FOREIGN KEY ("B") REFERENCES "Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
