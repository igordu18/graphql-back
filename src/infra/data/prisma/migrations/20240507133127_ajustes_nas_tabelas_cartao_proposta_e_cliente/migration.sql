/*
  Warnings:

  - You are about to drop the column `dataNascimento` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `id_proposta` on the `Cartao` table. All the data in the column will be lost.
  - Added the required column `data_nascimento` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_Cliente" ("cpf", "created_at", "email", "id", "nome", "updated_at") SELECT "cpf", "created_at", "email", "id", "nome", "updated_at" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_nome_key" ON "Cliente"("nome");
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
CREATE TABLE "new_Cartao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT,
    "cvv" TEXT,
    "validade" TEXT,
    "tipo" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "dados_gerados" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "proposta_id" TEXT,
    "cliente_id" TEXT,
    CONSTRAINT "Cartao_proposta_id_fkey" FOREIGN KEY ("proposta_id") REFERENCES "Proposta" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cartao_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cartao" ("created_at", "cvv", "id", "modalidade", "numero", "tipo", "updated_at", "validade") SELECT "created_at", "cvv", "id", "modalidade", "numero", "tipo", "updated_at", "validade" FROM "Cartao";
DROP TABLE "Cartao";
ALTER TABLE "new_Cartao" RENAME TO "Cartao";
CREATE UNIQUE INDEX "Cartao_proposta_id_key" ON "Cartao"("proposta_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
