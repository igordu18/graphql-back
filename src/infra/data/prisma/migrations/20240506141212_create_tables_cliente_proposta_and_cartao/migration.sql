-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "Proposta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_cliente" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "etapa" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Proposta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cartao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_proposta" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "validade" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Cartao_id_proposta_fkey" FOREIGN KEY ("id_proposta") REFERENCES "Proposta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_nome_key" ON "Cliente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
