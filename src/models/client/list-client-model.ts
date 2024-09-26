/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma'

export async function listClientModel() {
  const clientes = await prisma.cliente.findMany({
    select: {
      id: true,
      entidadeId: true,
      country: {
        select: {
          name: true,
          code: true,
        },
      },
      entidade: {
        select: {
          name: true,
          identificacao: true,
          tipodeIdentificacao: true,
          fornecedor: true,
        },
      },
      tipoDesconto: true,
      saldo: true,
      estado: true,
    },
  })

  // Mapeia os clientes adicionando o campo IsFornecedor e removendo o campo Fornecedor
  return clientes.map((cliente) => {
    const { entidade } = cliente
    const isFornecedor = Boolean(
      entidade.fornecedor && entidade.fornecedor.length,
    )

    // Remove o campo Fornecedor da entidade usando desestruturação
    const { fornecedor, ...entidadeSemFornecedor } = entidade

    return {
      ...cliente,
      entidade: {
        isFornecedor,
        ...entidadeSemFornecedor,
      },
    }
  })
}
