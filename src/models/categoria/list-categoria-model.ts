import { prisma } from '@/lib/prisma'

export async function listCategoryModel() {
  const list = await prisma.categoria.findMany({
    include: {
      _count: {
        select: {
          artigo: true,
          subCategoria: true,
        },
      },
    },
  })
  return list.map((e) => ({
    id: e.id,
    name: e.name,
    artigos: e._count.artigo,
    subCategorias: e._count.subCategoria,
  }))
}
