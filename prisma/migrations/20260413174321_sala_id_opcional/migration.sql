-- DropForeignKey
ALTER TABLE "Sessao" DROP CONSTRAINT "Sessao_salaId_fkey";

-- AlterTable
ALTER TABLE "Sessao" ALTER COLUMN "salaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE SET NULL ON UPDATE CASCADE;
