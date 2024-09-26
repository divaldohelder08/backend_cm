import type {
  TipoDesconto,
  TipoEntidade,
  TipoIdentificacao,
} from '@prisma/client'

import { prisma } from '@/lib/prisma'

interface props {
  data: {
    countryId: number
    telefone: string
    telefone2: string | null
    whatsapp: string | null
    endereco: string | null
    email: string | null
    subAccountId: number
    tipoDesconto: TipoDesconto
    valorDesconto: number | null
    percentagemDesconto: number | null
    efectuaRetencao: boolean
    saldo: number
    limiteSaldo: number
    limiteCredito: number
    entidade: {
      id: number
      name: string
      tipo: TipoEntidade
      identificacao: string
      tipodeIdentificacao: TipoIdentificacao
    }
  }
  id: number
}

export async function updateClientModel({
  data: {
    entidade: { id: entidadeId, ...ent },
    ...rest
  },
  id,
}: props) {
  await prisma.entidadeTerceiros.update({
    data: {
      ...ent,
    },
    where: {
      id: entidadeId,
    },
  })
  return await prisma.cliente.update({
    data: {
      ...rest,
    },
    where: {
      id,
    },
  })
}
