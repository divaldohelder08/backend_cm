import { prisma } from '@/lib/prisma'
import { Prisma } from '@/utils/prisma-throws'

export async function seedClient() {
  const ent = await prisma.entidadeTerceiros.findFirst({
    where: {
      name: 'Consumidor Final',
      tipo: 'SINGULAR',
      identificacao: '999999999',
      tipodeIdentificacao: 'NIF',
    },
  })

  if (ent) return

  const angolaId = await Prisma.country.findByCodeError('AO')
  const subAccount = await Prisma.subAccount.findByNumeroError('31.1')

  const entidade = await prisma.entidadeTerceiros.create({
    data: {
      name: 'Consumidor Final',
      tipo: 'SINGULAR',
      identificacao: '999999999',
      tipodeIdentificacao: 'NIF',
    },
  })
  await prisma.cliente.create({
    data: {
      entidadeId: entidade.id,
      telefone: '920000000',
      subContaId: subAccount.id,
      tipoDesconto: 'NENHUM',
      efectuaRetencao: false,
      saldo: 0,
      limiteSaldo: 0,
      limiteCredito: 0,
      estado: 'ACTIVO',
      countryId: angolaId.id,
    },
  })
}
