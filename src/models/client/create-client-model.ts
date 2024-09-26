import { prisma } from '@/lib/prisma'
import type { cliente, entidade } from '@/types/global'

import { createEntidadeModel } from '../entidade/create-entidade-model'

interface client {
  client: cliente
}
interface props extends client {
  entidadeId: number
}
interface props1 extends client {
  entidade: entidade
}

export async function createClientAndEntidadeModel({
  client,
  entidade,
}: props1) {
  const { id } = await createEntidadeModel({ entidade })
  await createClient({ client, entidadeId: id })
}

export async function createClient({ entidadeId, client: { ...rest } }: props) {
  const cliente = await prisma.cliente.create({
    data: {
      entidadeId,
      ...rest,
    },
  })
  return cliente
}
