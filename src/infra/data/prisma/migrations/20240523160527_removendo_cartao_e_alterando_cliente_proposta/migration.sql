/*
  Warnings:

  - You are about to drop the `Cartao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `etapa` on the `Proposta` table. All the data in the column will be lost.
  - Added the required column `desconto` to the `Proposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivo` to the `Proposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `multa` to the `Proposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_em_debito` to the `Proposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_pago` to the `Proposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cliente_ativo` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `divida_ativa` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_divida` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cartao_proposta_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cartao";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Proposta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "valor_em_debito" REAL NOT NULL,
    "multa" REAL NOT NULL,
    "desconto" REAL NOT NULL,
    "valor_pago" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "id_cliente" TEXT NOT NULL,
    CONSTRAINT "Proposta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Proposta" ("created_at", "id", "id_cliente", "status", "updated_at") SELECT "created_at", "id", "id_cliente", "status", "updated_at" FROM "Proposta";
DROP TABLE "Proposta";
ALTER TABLE "new_Proposta" RENAME TO "Proposta";
CREATE TABLE "new_Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "endereco" TEXT NOT NULL,
    "divida_ativa" BOOLEAN NOT NULL,
    "valor_divida" REAL NOT NULL,
    "cliente_ativo" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_Cliente" ("cpf", "created_at", "data_nascimento", "email", "id", "nome", "updated_at") SELECT "cpf", "created_at", "data_nascimento", "email", "id", "nome", "updated_at" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_nome_key" ON "Cliente"("nome");
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
