/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma'

export async function listFornecedoresModel() {
  const fornecedores = await prisma.fornecedor.findMany({
    select: {
      id: true,
      entidadeId: true,
      email: true,
      country: {
        select: {
          name: true,
          code: true,
        },
      },
      entidade: {
        select: {
          id: true,
          name: true,
          identificacao: true,
          tipodeIdentificacao: true,
          cliente: true,
        },
      },
      estado: true,
    },
  })

  // Mapeia os fornecedores adicionando o campo IsCliente e removendo o campo Cliente
  return fornecedores.map((fornecedor) => {
    const { entidade } = fornecedor
    const isCliente = Boolean(entidade.cliente && entidade.cliente.length)

    // Remove o campo Cliente da entidade usando desestruturação
    const { cliente, ...entidadeSemCliente } = entidade

    return {
      ...fornecedor,
      entidade: {
        isCliente,
        ...entidadeSemCliente,
      },
    }
  })
}
