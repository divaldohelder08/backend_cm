import { prisma } from '@/lib/prisma'

const Class = [
  { numero_classe: '1', nome_classe: 'Meios Fixos e Investimentos' },
  { numero_classe: '2', nome_classe: 'Existências' },
  { numero_classe: '3', nome_classe: 'Terceiros' },
  { numero_classe: '4', nome_classe: 'Meios Monet rios' },
  { numero_classe: '5', nome_classe: 'Capital e Reservas' },
  {
    numero_classe: '6',
    nome_classe: 'Proveitos e Ganhos Por Natureza(Receitas)',
  },
  { numero_classe: '7', nome_classe: 'Custos e Perdas Por Natureza(Despesas)' },
  { numero_classe: '8', nome_classe: 'Resultado' },
]

export async function seedClasse() {
  const count = await prisma.classe.count()
  if (count > 0) return
  for (const itemClass of Class) {
    await prisma.classe.create({
      data: {
        name: itemClass.nome_classe,
        numero: itemClass.numero_classe,
        estado: 'INATIVO',
      },
    })
  }
}
