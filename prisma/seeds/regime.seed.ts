import { prisma } from '@/lib/prisma'

const nomes = ['GERAL', 'SIMPLIFICADO', 'EXCLUSÃO']

export async function seedRegime() {
  const regi = await prisma.regimeFiscal.count()
  if (regi > 0) return

  for (const name of nomes) {
    await prisma.regimeFiscal.create({
      data: {
        name,
      },
    })
  }
}
