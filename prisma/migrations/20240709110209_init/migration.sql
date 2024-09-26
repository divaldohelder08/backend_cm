-- CreateEnum
CREATE TYPE "EmpresaType" AS ENUM ('SEDE', 'FILIAL');

-- CreateEnum
CREATE TYPE "RegimeIva" AS ENUM ('NAO_SUJEITO', 'SIMPLIFICADO', 'GERAL');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORD_RECOVER');

-- CreateEnum
CREATE TYPE "identification" AS ENUM ('NIF', 'BI', 'CARTAO_DE_RESIDENTE', 'PASSAPORTE');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('singular', 'coletivo');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('activo', 'removido');

-- CreateEnum
CREATE TYPE "DescontoType" AS ENUM ('COMERCIAL', 'FINANCEIRO', 'DIVERSO', 'NENHUM');

-- CreateEnum
CREATE TYPE "Area" AS ENUM ('COMERCIO_GERAL', 'RESTAURANTE', 'HOTELARIA', 'OFICINA');

-- CreateEnum
CREATE TYPE "Family" AS ENUM ('produto', 'servico');

-- CreateEnum
CREATE TYPE "State_class" AS ENUM ('Active', 'inactive');

-- CreateEnum
CREATE TYPE "typeAGT" AS ENUM ('IVA', 'IS', 'NS');

-- CreateEnum
CREATE TYPE "TypeIsencao" AS ENUM ('ATIVO', 'INATIVO');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "avatar" TEXT,
    "password" TEXT NOT NULL DEFAULT '000000',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,
    "prazo_senha" TIMESTAMP(3),
    "reset_sentAt" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "code" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "role_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("role_id","user_id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provincias" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "provincias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EmpresaType" NOT NULL,
    "avatar" TEXT,
    "countryId" INTEGER NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "telefone" TEXT NOT NULL,
    "telefone1" TEXT,
    "email" TEXT,
    "nif" TEXT NOT NULL,
    "cae" TEXT,
    "num_alvara" TEXT,
    "regime_iva" "RegimeIva" NOT NULL,
    "indicador_factura" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Impost" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Impost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImpostTax" (
    "id" SERIAL NOT NULL,
    "impostId" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImpostTax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "identification" TEXT NOT NULL,
    "identificationType" "identification" NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,
    "whatsapp" TEXT,
    "address" TEXT,
    "email" TEXT,
    "status" "Status" NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,
    "whatsapp" TEXT,
    "address" TEXT,
    "email" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artigo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT,
    "categoryId" INTEGER,
    "subCategoryId" INTEGER,
    "unidadeId" INTEGER,
    "stock_max" INTEGER,
    "stock_min" INTEGER,
    "area" "Area" NOT NULL,
    "status" "Status" NOT NULL,
    "family" "Family" NOT NULL,

    CONSTRAINT "Artigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtigoBarCode" (
    "id" SERIAL NOT NULL,
    "artigoId" INTEGER NOT NULL,
    "fornecedorId" INTEGER NOT NULL,
    "barCode" TEXT NOT NULL,

    CONSTRAINT "ArtigoBarCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armazem" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "description" TEXT,
    "localidade" TEXT,
    "bloqueio_entrada" BOOLEAN NOT NULL,
    "bloqueio_saidan" BOOLEAN NOT NULL,

    CONSTRAINT "Armazem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loja" (
    "id" SERIAL NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "bi" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "number_class" TEXT NOT NULL,
    "name_class" TEXT NOT NULL,
    "state_class" "State_class" NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_state" "State_class" NOT NULL,
    "classesId" INTEGER,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_Account" (
    "id" SERIAL NOT NULL,
    "sub_account_number" TEXT NOT NULL,
    "describe_sub_account" TEXT NOT NULL,
    "state_sub_account" TEXT NOT NULL,
    "accountId" INTEGER,

    CONSTRAINT "sub_Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_tribute" (
    "id" SERIAL NOT NULL,
    "tribute" TEXT NOT NULL,
    "AGTtype" TEXT NOT NULL,
    "Registration_Date" TIMESTAMP(3) NOT NULL,
    "modification_date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "type_tribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atribute_rate" (
    "id" SERIAL NOT NULL,
    "fee_value" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "type_tributeId" INTEGER,

    CONSTRAINT "atribute_rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isencao" (
    "id" SERIAL NOT NULL,
    "codIsencao" TEXT NOT NULL,
    "MencaoConstarDoc" TEXT NOT NULL,
    "NormaAplicavel" TEXT,
    "Descricao" TEXT NOT NULL,
    "RegimeGeral" INTEGER NOT NULL,
    "RegimeTransitorio" INTEGER NOT NULL,
    "RegimeNaoSujeicao" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "isencao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_code_key" ON "tokens"("code");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_slug_key" ON "permissions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_codigo_key" ON "organizations"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_telefone_key" ON "organizations"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_telefone1_key" ON "organizations"("telefone1");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_nif_key" ON "organizations"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Unidade_name_key" ON "Unidade"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Loja_email_key" ON "Loja"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Loja_telefone_key" ON "Loja"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Loja_telefone2_key" ON "Loja"("telefone2");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provincias" ADD CONSTRAINT "provincias_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "provincias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImpostTax" ADD CONSTRAINT "ImpostTax_impostId_fkey" FOREIGN KEY ("impostId") REFERENCES "Impost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigo" ADD CONSTRAINT "Artigo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigo" ADD CONSTRAINT "Artigo_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigo" ADD CONSTRAINT "Artigo_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtigoBarCode" ADD CONSTRAINT "ArtigoBarCode_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtigoBarCode" ADD CONSTRAINT "ArtigoBarCode_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES "Artigo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loja" ADD CONSTRAINT "Loja_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "provincias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_Account" ADD CONSTRAINT "sub_Account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_tribute" ADD CONSTRAINT "type_tribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atribute_rate" ADD CONSTRAINT "atribute_rate_type_tributeId_fkey" FOREIGN KEY ("type_tributeId") REFERENCES "type_tribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isencao" ADD CONSTRAINT "isencao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
