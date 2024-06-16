-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "endereco" TEXT NOT NULL,
    "divida_ativa" BOOLEAN NOT NULL,
    "valor_divida" REAL,
    "cliente_ativo" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_Cliente" ("cliente_ativo", "cpf", "created_at", "data_nascimento", "divida_ativa", "email", "endereco", "id", "nome", "updated_at", "valor_divida") SELECT "cliente_ativo", "cpf", "created_at", "data_nascimento", "divida_ativa", "email", "endereco", "id", "nome", "updated_at", "valor_divida" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_nome_key" ON "Cliente"("nome");
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
CREATE TABLE "new_Proposta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "valor_em_debito" REAL NOT NULL,
    "multa" REAL NOT NULL,
    "desconto" REAL NOT NULL,
    "valor_pago" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "id_cliente" TEXT NOT NULL,
    CONSTRAINT "Proposta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Proposta" ("created_at", "desconto", "id", "id_cliente", "motivo", "multa", "status", "updated_at", "valor_em_debito", "valor_pago") SELECT "created_at", "desconto", "id", "id_cliente", "motivo", "multa", "status", "updated_at", "valor_em_debito", "valor_pago" FROM "Proposta";
DROP TABLE "Proposta";
ALTER TABLE "new_Proposta" RENAME TO "Proposta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
