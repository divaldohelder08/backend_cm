import { prisma } from '@/lib/prisma'

export async function listUnityModel() {
  const list = await prisma.unidade.findMany({
    include: {
      _count: {
        select: {
          artigo: true,
        },
      },
    },
  })
  return list.map((e) => ({
    id: e.id,
    name: e.name,
    artigos: e._count.artigo,
  }))
}
