-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "rh";

-- CreateEnum
CREATE TYPE "public"."EmpresaType" AS ENUM ('SEDE', 'FILIAL');

-- CreateEnum
CREATE TYPE "public"."RegimeIva" AS ENUM ('NAO_SUJEITO', 'SIMPLIFICADO', 'GERAL');

-- CreateEnum
CREATE TYPE "public"."TokenType" AS ENUM ('PASSWORD_RECOVER');

-- CreateEnum
CREATE TYPE "public"."areaArtigo" AS ENUM ('COMERCIO_GERAL', 'RESTAURANTE', 'HOTELARIA', 'OFICINA');

-- CreateEnum
CREATE TYPE "public"."Familia" AS ENUM ('PRODUCT', 'SERVICE');

-- CreateEnum
CREATE TYPE "public"."Area" AS ENUM ('COMERCIO_GERAL', 'RESTAURANTE', 'HOTELARIA', 'OFICINA');

-- CreateEnum
CREATE TYPE "public"."ClasseEstado" AS ENUM ('ACTIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "public"."TipoEntidade" AS ENUM ('SINGULAR', 'COLECTIVO');

-- CreateEnum
CREATE TYPE "public"."TipoIdentificacao" AS ENUM ('NIF', 'BI', 'CARTAO_DE_RESIDENTE', 'PASSAPORTE');

-- CreateEnum
CREATE TYPE "public"."TipoDesconto" AS ENUM ('COMERCIAL', 'FINANCEIRO', 'DIVERSO', 'NENHUM');

-- CreateEnum
CREATE TYPE "public"."Estado" AS ENUM ('ACTIVO', 'REMOVIDO');

-- CreateEnum
CREATE TYPE "public"."DescontoType" AS ENUM ('COMERCIAL', 'FINANCEIRO', 'DIVERSO', 'NENHUM');

-- CreateEnum
CREATE TYPE "public"."TipoAGT" AS ENUM ('IVA', 'IS', 'NS');

-- CreateEnum
CREATE TYPE "rh"."Status" AS ENUM ('Submetido', 'Aprovado', 'Rejeitado', 'Requerido');

-- CreateEnum
CREATE TYPE "rh"."TipoAvaliacao" AS ENUM ('Auto_Avaliacao', 'Departamento');

-- CreateEnum
CREATE TYPE "rh"."Criterio" AS ENUM ('Comportamental', 'Tecnico');

-- CreateEnum
CREATE TYPE "rh"."Tipo" AS ENUM ('livro', 'cientifico', 'outro');

-- CreateEnum
CREATE TYPE "rh"."Contrato" AS ENUM ('CTD', 'CAP');

-- CreateEnum
CREATE TYPE "rh"."NIVEL_ACADEMICO" AS ENUM ('Base', 'Medio', 'Universitario', 'Licenciado', 'Mestrado', 'Doctoramento');

-- CreateEnum
CREATE TYPE "rh"."Identificacao" AS ENUM ('BI', 'Passaporte', 'Residente', 'Outro');

-- CreateEnum
CREATE TYPE "rh"."Regime" AS ENUM ('geral', 'especial');

-- CreateEnum
CREATE TYPE "rh"."Genero" AS ENUM ('masculino', 'feminino');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "avatar" TEXT,
    "password" TEXT NOT NULL DEFAULT '000000',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,
    "prazo_senha" TIMESTAMP(3),
    "reset_sentAt" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tokens" (
    "code" TEXT NOT NULL,
    "type" "public"."TokenType" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "public"."permissions" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_profiles" (
    "role_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("role_id","user_id")
);

-- CreateTable
CREATE TABLE "public"."role_permissions" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "public"."countries" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id","code")
);

-- CreateTable
CREATE TABLE "public"."provincias" (
    "id" SERIAL NOT NULL,
    "countryCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "provincias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RegimeFiscal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RegimeFiscal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Empresa" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT,
    "name" TEXT NOT NULL,
    "type" "public"."EmpresaType" NOT NULL,
    "avatar" TEXT,
    "countryId" INTEGER NOT NULL,
    "regimeId" INTEGER,
    "provinciaId" INTEGER NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "telefone" TEXT NOT NULL,
    "telefone1" TEXT,
    "email" TEXT,
    "nif" TEXT NOT NULL,
    "numero_de_alvara" TEXT,
    "indicador_factura" TEXT,
    "comercioGeral" BOOLEAN NOT NULL DEFAULT false,
    "restaurante" BOOLEAN NOT NULL DEFAULT false,
    "hotelaria" BOOLEAN NOT NULL DEFAULT false,
    "oficina" BOOLEAN NOT NULL DEFAULT false,
    "valorInicialRetencaoFonte" DOUBLE PRECISION,
    "retencaoFonteServico" BOOLEAN NOT NULL DEFAULT false,
    "percentagemRetencaoFonte" DOUBLE PRECISION,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Unidade" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubCategoria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "SubCategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."impost_tipo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tipo" "public"."TipoAGT" NOT NULL,

    CONSTRAINT "impost_tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."imposta_taxa" (
    "id" SERIAL NOT NULL,
    "impostId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "imposta_taxa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Isencao" (
    "id" SERIAL NOT NULL,
    "codIsencao" TEXT NOT NULL,
    "mencaoConstarDoc" TEXT NOT NULL,
    "normaAplicavel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "regimeGeral" BOOLEAN NOT NULL,
    "regimeTransitorio" BOOLEAN NOT NULL,
    "regimeNaoSujeicao" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Isencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RegimeTaxaImposto" (
    "id" SERIAL NOT NULL,
    "regimeId" INTEGER NOT NULL,
    "taxaImpostoId" INTEGER NOT NULL,
    "incideCliente" BOOLEAN NOT NULL DEFAULT false,
    "insideEmpresa" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RegimeTaxaImposto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Classe" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "estado" "public"."ClasseEstado" NOT NULL,

    CONSTRAINT "Classe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Conta" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "classeId" INTEGER NOT NULL,
    "estado" "public"."ClasseEstado" NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id","numero")
);

-- CreateTable
CREATE TABLE "public"."SubConta" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contaId" INTEGER,
    "estado" "public"."ClasseEstado" NOT NULL,

    CONSTRAINT "SubConta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EntidadeTerceiros" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tipo" "public"."TipoEntidade" NOT NULL,
    "identificacao" TEXT NOT NULL,
    "tipodeIdentificacao" "public"."TipoIdentificacao" NOT NULL,

    CONSTRAINT "EntidadeTerceiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Fornecedor" (
    "id" SERIAL NOT NULL,
    "entidadeId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,
    "whatsapp" TEXT,
    "endereco" TEXT,
    "email" TEXT,
    "subContaId" INTEGER NOT NULL,
    "estado" "public"."Estado" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cliente" (
    "id" SERIAL NOT NULL,
    "entidadeId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,
    "whatsapp" TEXT,
    "endereco" TEXT,
    "email" TEXT,
    "sub_conta_id" INTEGER NOT NULL,
    "tipo_desconto" "public"."TipoDesconto" NOT NULL,
    "valor_desconto" DOUBLE PRECISION,
    "percentagem_desconto" DOUBLE PRECISION,
    "efectua_retencao" BOOLEAN NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "limiteSaldo" DOUBLE PRECISION NOT NULL,
    "limiteCredito" DOUBLE PRECISION NOT NULL,
    "estado" "public"."Estado" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Loja" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identificacao" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "funcionarioId" INTEGER,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Armazem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lojaId" INTEGER,
    "description" TEXT,
    "localidade" TEXT,
    "bloqueioEntrada" BOOLEAN NOT NULL,
    "bloqueioSaida" BOOLEAN NOT NULL,

    CONSTRAINT "Armazem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Artigo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imagem" TEXT,
    "categoriaId" INTEGER,
    "subCategoriaId" INTEGER,
    "unidadeId" INTEGER,
    "familia" "public"."Familia" NOT NULL,
    "estado" "public"."Estado" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subCarreiraId" INTEGER,

    CONSTRAINT "Artigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArtigoCodigoBarra" (
    "id" SERIAL NOT NULL,
    "artigoId" INTEGER NOT NULL,
    "forncedorId" INTEGER,
    "codigoBarra" TEXT NOT NULL,

    CONSTRAINT "ArtigoCodigoBarra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PrecoArtigo" (
    "id" SERIAL NOT NULL,
    "area" "public"."Area" NOT NULL,
    "artigoId" INTEGER NOT NULL,
    "controloStock" BOOLEAN,
    "stock_min" INTEGER,
    "stock_max" INTEGER,
    "lojaId" INTEGER,
    "armazemId" INTEGER,
    "preco" DOUBLE PRECISION NOT NULL,
    "taxaImpostoId" INTEGER,
    "isencaoId" INTEGER,
    "reterFonte" BOOLEAN,
    "precoImposto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PrecoArtigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."carreira" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "regime" "rh"."Regime" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carreira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."subcarreira" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "carreiraId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subcarreira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "salario_base" DOUBLE PRECISION NOT NULL,
    "carreiraId" INTEGER,
    "subCarreiraId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."funcao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."banco" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."funcionario" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "nomePai" TEXT NOT NULL,
    "nomeMae" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "genero" "rh"."Genero" NOT NULL,
    "tipo_identificacao" "rh"."Identificacao" NOT NULL,
    "num_identificacao" TEXT NOT NULL,
    "nivel_academico" "rh"."NIVEL_ACADEMICO" NOT NULL,
    "avatar" TEXT,
    "telefone1" TEXT NOT NULL,
    "telefone2" TEXT,
    "linkedin" TEXT,
    "whatsApp" TEXT,
    "instagram" TEXT,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "funcaoId" INTEGER,
    "categoriaId" INTEGER,
    "numeroConta" TEXT,
    "iban" TEXT,
    "bancoId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."DadosProfissionais" (
    "id" SERIAL NOT NULL,
    "data_admissao" TIMESTAMP(3) NOT NULL,
    "numeroDespacho" TEXT,
    "data_despacho" TIMESTAMP(3) NOT NULL,
    "contrato" "rh"."Contrato" NOT NULL,
    "funcionarioId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DadosProfissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."formacoes" (
    "id" SERIAL NOT NULL,
    "ano_inicio" TIMESTAMP(3) NOT NULL,
    "ano_termino" TIMESTAMP(3) NOT NULL,
    "formacao" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "funcionarioId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."publicacoes" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "ano" TIMESTAMP(3) NOT NULL,
    "tipo" "rh"."Tipo" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."ExperiencialLaboral" (
    "id" SERIAL NOT NULL,
    "ano_inicio" TIMESTAMP(3) NOT NULL,
    "ano_termino" TIMESTAMP(3) NOT NULL,
    "funcao" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "pais" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "funcionarioId" INTEGER,

    CONSTRAINT "ExperiencialLaboral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."Departamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "Id_funcionario_chefe" INTEGER,
    "Id_funcionario_supervisor" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."FuncionarioDepartamento" (
    "id" SERIAL NOT NULL,
    "departamentoId" INTEGER,
    "funcionarioId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FuncionarioDepartamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."fichaAvaliacao" (
    "id" SERIAL NOT NULL,
    "nome_ficha" TEXT NOT NULL,
    "objetivo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fichaAvaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."Competencia" (
    "id" SERIAL NOT NULL,
    "nome_competencia" TEXT NOT NULL,
    "criterio" "rh"."Criterio" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."PerguntaFichaAvaliacao" (
    "id" SERIAL NOT NULL,
    "competenciaId" INTEGER,
    "fichaAvaliacaoId" INTEGER,
    "descricao" TEXT NOT NULL,
    "nivel_esperado" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerguntaFichaAvaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rh"."Avaliacao" (
    "id" SERIAL NOT NULL,
    "id_funcionario_avaliador" INTEGER,
    "id_fichaAvaliacao" INTEGER,
    "id_departamento" INTEGER,
    "Tipo_Avaliacao" "rh"."TipoAvaliacao" NOT NULL,
    "status" "rh"."Status" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comentario" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_code_key" ON "public"."tokens"("code");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_slug_key" ON "public"."permissions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "public"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_id_key" ON "public"."countries"("id");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "public"."countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_telefone_key" ON "public"."Empresa"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_telefone1_key" ON "public"."Empresa"("telefone1");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nif_key" ON "public"."Empresa"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Unidade_name_key" ON "public"."Unidade"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_name_key" ON "public"."Categoria"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategoria_name_key" ON "public"."SubCategoria"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Conta_numero_key" ON "public"."Conta"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "SubConta_numero_key" ON "public"."SubConta"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_entidadeId_key" ON "public"."Fornecedor"("entidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_entidadeId_key" ON "public"."Cliente"("entidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "carreira_nome_key" ON "rh"."carreira"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_email_key" ON "rh"."funcionario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_telefone1_key" ON "rh"."funcionario"("telefone1");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_telefone2_key" ON "rh"."funcionario"("telefone2");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_numeroConta_key" ON "rh"."funcionario"("numeroConta");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_iban_key" ON "rh"."funcionario"("iban");

-- CreateIndex
CREATE UNIQUE INDEX "fichaAvaliacao_nome_ficha_key" ON "rh"."fichaAvaliacao"("nome_ficha");

-- CreateIndex
CREATE UNIQUE INDEX "Competencia_nome_competencia_key" ON "rh"."Competencia"("nome_competencia");

-- AddForeignKey
ALTER TABLE "public"."tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_profiles" ADD CONSTRAINT "user_profiles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."provincias" ADD CONSTRAINT "provincias_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "public"."countries"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Empresa" ADD CONSTRAINT "Empresa_regimeId_fkey" FOREIGN KEY ("regimeId") REFERENCES "public"."RegimeFiscal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Empresa" ADD CONSTRAINT "Empresa_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "public"."provincias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Empresa" ADD CONSTRAINT "Empresa_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubCategoria" ADD CONSTRAINT "SubCategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."imposta_taxa" ADD CONSTRAINT "imposta_taxa_impostId_fkey" FOREIGN KEY ("impostId") REFERENCES "public"."impost_tipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegimeTaxaImposto" ADD CONSTRAINT "RegimeTaxaImposto_taxaImpostoId_fkey" FOREIGN KEY ("taxaImpostoId") REFERENCES "public"."imposta_taxa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegimeTaxaImposto" ADD CONSTRAINT "RegimeTaxaImposto_regimeId_fkey" FOREIGN KEY ("regimeId") REFERENCES "public"."RegimeFiscal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Conta" ADD CONSTRAINT "Conta_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "public"."Classe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubConta" ADD CONSTRAINT "SubConta_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "public"."Conta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fornecedor" ADD CONSTRAINT "Fornecedor_subContaId_fkey" FOREIGN KEY ("subContaId") REFERENCES "public"."SubConta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fornecedor" ADD CONSTRAINT "Fornecedor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fornecedor" ADD CONSTRAINT "Fornecedor_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."EntidadeTerceiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cliente" ADD CONSTRAINT "Cliente_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cliente" ADD CONSTRAINT "Cliente_sub_conta_id_fkey" FOREIGN KEY ("sub_conta_id") REFERENCES "public"."SubConta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cliente" ADD CONSTRAINT "Cliente_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."EntidadeTerceiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Loja" ADD CONSTRAINT "Loja_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "public"."provincias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Loja" ADD CONSTRAINT "Loja_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "rh"."funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Armazem" ADD CONSTRAINT "Armazem_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "public"."Loja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Artigo" ADD CONSTRAINT "Artigo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Artigo" ADD CONSTRAINT "Artigo_subCategoriaId_fkey" FOREIGN KEY ("subCategoriaId") REFERENCES "public"."SubCategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Artigo" ADD CONSTRAINT "Artigo_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "public"."Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Artigo" ADD CONSTRAINT "Artigo_subCarreiraId_fkey" FOREIGN KEY ("subCarreiraId") REFERENCES "rh"."subcarreira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArtigoCodigoBarra" ADD CONSTRAINT "ArtigoCodigoBarra_forncedorId_fkey" FOREIGN KEY ("forncedorId") REFERENCES "public"."Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArtigoCodigoBarra" ADD CONSTRAINT "ArtigoCodigoBarra_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES "public"."Artigo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrecoArtigo" ADD CONSTRAINT "PrecoArtigo_taxaImpostoId_fkey" FOREIGN KEY ("taxaImpostoId") REFERENCES "public"."imposta_taxa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrecoArtigo" ADD CONSTRAINT "PrecoArtigo_armazemId_fkey" FOREIGN KEY ("armazemId") REFERENCES "public"."Armazem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrecoArtigo" ADD CONSTRAINT "PrecoArtigo_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "public"."Loja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrecoArtigo" ADD CONSTRAINT "PrecoArtigo_isencaoId_fkey" FOREIGN KEY ("isencaoId") REFERENCES "public"."Isencao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrecoArtigo" ADD CONSTRAINT "PrecoArtigo_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES "public"."Artigo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."subcarreira" ADD CONSTRAINT "subcarreira_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "rh"."carreira"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."categoria" ADD CONSTRAINT "categoria_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "rh"."carreira"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."categoria" ADD CONSTRAINT "categoria_subCarreiraId_fkey" FOREIGN KEY ("subCarreiraId") REFERENCES "rh"."subcarreira"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."funcionario" ADD CONSTRAINT "funcionario_funcaoId_fkey" FOREIGN KEY ("funcaoId") REFERENCES "rh"."funcao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."funcionario" ADD CONSTRAINT "funcionario_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "rh"."categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."funcionario" ADD CONSTRAINT "funcionario_bancoId_fkey" FOREIGN KEY ("bancoId") REFERENCES "rh"."banco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."DadosProfissionais" ADD CONSTRAINT "DadosProfissionais_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "rh"."funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."formacoes" ADD CONSTRAINT "formacoes_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "rh"."funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."ExperiencialLaboral" ADD CONSTRAINT "ExperiencialLaboral_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "rh"."funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."Departamento" ADD CONSTRAINT "Departamento_Id_funcionario_chefe_fkey" FOREIGN KEY ("Id_funcionario_chefe") REFERENCES "rh"."funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."Departamento" ADD CONSTRAINT "Departamento_Id_funcionario_supervisor_fkey" FOREIGN KEY ("Id_funcionario_supervisor") REFERENCES "rh"."funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."FuncionarioDepartamento" ADD CONSTRAINT "FuncionarioDepartamento_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "rh"."Departamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."FuncionarioDepartamento" ADD CONSTRAINT "FuncionarioDepartamento_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "rh"."funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."PerguntaFichaAvaliacao" ADD CONSTRAINT "PerguntaFichaAvaliacao_competenciaId_fkey" FOREIGN KEY ("competenciaId") REFERENCES "rh"."Competencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."PerguntaFichaAvaliacao" ADD CONSTRAINT "PerguntaFichaAvaliacao_fichaAvaliacaoId_fkey" FOREIGN KEY ("fichaAvaliacaoId") REFERENCES "rh"."fichaAvaliacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."Avaliacao" ADD CONSTRAINT "Avaliacao_id_funcionario_avaliador_fkey" FOREIGN KEY ("id_funcionario_avaliador") REFERENCES "rh"."funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."Avaliacao" ADD CONSTRAINT "Avaliacao_id_fichaAvaliacao_fkey" FOREIGN KEY ("id_fichaAvaliacao") REFERENCES "rh"."fichaAvaliacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rh"."Avaliacao" ADD CONSTRAINT "Avaliacao_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "rh"."Departamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
