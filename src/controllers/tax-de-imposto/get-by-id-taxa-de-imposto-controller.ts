import { prisma } from '@/lib/prisma'

export async function GetByIdTaxaDeImposto(id: number) {
  const tipoDeImposto = await prisma.impostTax.findUnique({ where: { id } })
  if (tipoDeImposto) {
    return tipoDeImposto?.value
  }
}
