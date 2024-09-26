import type { FastifyReply, FastifyRequest } from 'fastify'

export interface carreira {
  id: number
  nome_carreira: string
  regime: string
  createdAt: Date
  updatedAt: Date
}

export interface app {
  request: FastifyRequest
  reply: FastifyReply
}

export interface entidade {
  id?: number
  name: string
  tipo: 'SINGULAR' | 'COLECTIVO'
  identificacao: string
  tipodeIdentificacao: 'NIF' | 'BI' | 'CARTAO_DE_RESIDENTE' | 'PASSAPORTE'
}

export interface cliente {
  id?: number
  countryId: number
  telefone: string
  telefone2?: string | null
  whatsapp?: string | null
  endereco?: string | null
  email?: string | null
  subContaId: number
  tipoDesconto: 'COMERCIAL' | 'FINANCEIRO' | 'DIVERSO' | 'NENHUM'
  valorDesconto?: number | null
  percentagemDesconto?: number | null
  efectuaRetencao: boolean
  saldo: number
  limiteSaldo: number
  limiteCredito: number
  estado?: 'ACTIVO' | 'REMOVIDO'
}

export interface fornecedor {
  id?: number
  countryId: number
  telefone: string
  telefone2?: string | null
  whatsapp?: string | null
  endereco?: string | null
  email?: string | null
  subContaId: number
  estado?: 'ACTIVO' | 'REMOVIDO'
}

export interface Artigo {
  name: string
  Estado: 'ACTIVO' | 'REMOVIDO'

  Familia: 'PRODUCT' | 'SERVICE'
  comercio_geral?: 'ACTIVO' | 'INATIVO'
  restaurante?: 'ACTIVO' | 'INATIVO'
  hotelaria?: 'ACTIVO' | 'INATIVO'
  oficina?: 'ACTIVO' | 'INATIVO'
}

export interface precoArtigo {
  controlo_stock?: boolean | null
  area: 'COMERCIO_GERAL' | 'RESTAURANTE' | 'HOTELARIA' | 'OFICINA'
  stockMin?: number | null
  stockMax?: number | null
  preco: number
  idTaxaImposto?: number | null
  precoImposto?: number | null
  armazemId?: number | null
  lojaId?: number | null
  isencaoId?: number | null
  artigoId?: number
}
export interface precoArtigoUpdate {

  controlo_stock?: boolean | null
  area?: "COMERCIO_GERAL" | "RESTAURANTE" | "HOTELARIA" | "OFICINA"
  stockMin?: number | null
  stockMax?: number | null
  preco?: number
  idTaxaImposto?: number | null
  precoImposto?: number | null
  armazemId?: number | null
  lojaId?: number | null
  isencaoId?: number | null
  artigoId?: number
}

export interface Loja {
  id?: number
  name: string
  identificacao: string
  address: string
  provinciaId: number
  telefone: string
  telefone2?: string
  email: string
}

export interface Armazem {
  id?: number
  name: string
  loja: { id: number; name: string }
  description?: string
  localidade?: string
  bloqueioEntrada: boolean
  bloqueioSaida: boolean
}

export interface Role {
  id?: number
  name: string
  description?: string
}
export interface Funcao {
  id: number
  nome_funcao: string
  createdAt: Date
  updatedAt: Date
}

export type typer<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : never
