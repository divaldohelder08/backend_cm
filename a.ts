import { prisma } from '@/lib/prisma'

const clientes = await prisma.cliente.findMany({
  include: {
    entidade: {
      include: {
        Fornecedor: true,
      },
    },
  },
})

// Mapeia os clientes adicionando o campo IsFornecedor e removendo o campo Fornecedor
const clientesComIsFornecedor = clientes.map((cliente) => {
  const { entidade } = cliente
  const isFornecedor = !!entidade.Fornecedor && entidade.Fornecedor.length > 0

  // Remove o campo Fornecedor da entidade
  const { Fornecedor, ...entidadeSemFornecedor } = entidade

  return {
    ...cliente,
    entidade: entidadeSemFornecedor,
    IsFornecedor: isFornecedor,
  }
})

console.log(clientesComIsFornecedor)
