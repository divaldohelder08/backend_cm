import { prisma } from '@/lib/prisma'

const account = [
  { numero: '11', name: 'Imobiliza  es corp reas', classeId: '1' },
  {
    numero: '12',
    name: 'Imobiliza  es incorp reas',
    classeId: '1',
  },
  {
    numero: '13',
    name: 'Investimentos financeiros',
    classeId: '1',
  },
  { numero: '14', name: 'Imobiliza  es em cursos', classeId: '1' },
  { numero: '18', name: 'Amortiza  es acumuladas', classeId: '1' },
  {
    numero: '19',
    name: 'Previs es para investimentos financeiros',
    classeId: '1',
  },
  { numero: '21', name: 'Compras', classeId: '2' },
  {
    numero: '22',
    name: 'Mat rias - primas, subsidi rias e de consumo',
    classeId: '2',
  },
  {
    numero: '23',
    name: 'Produtos e trabalhos em curso',
    classeId: '2',
  },
  {
    numero: '24',
    name: 'Produtos acabados e interm dios',
    classeId: '2',
  },
  {
    numero: '25',
    name: 'Subprodutos, desperd cios, res duos e refugos',
    classeId: '2',
  },
  { numero: '26', name: 'Mercadorias', classeId: '2' },
  {
    numero: '27',
    name: 'Mat rias - primas, mercadorias e outros materiais em tr nsito',
    classeId: '2',
  },
  {
    numero: '28',
    name: 'Adiantamento por conta de compras',
    classeId: '2',
  },
  {
    numero: '29',
    name: 'Previs o para deprecia  o de exist ncias',
    classeId: '2',
  },
  { numero: '31', name: 'Clientes', classeId: '3' },
  { numero: '32', name: 'Fornecedores', classeId: '3' },
  { numero: '33', name: 'Emprestimos', classeId: '3' },
  { numero: '34', name: 'Estado', classeId: '3' },
  {
    numero: '35',
    name: 'Entidades participantes e participadas',
    classeId: '3',
  },
  { numero: '36', name: 'Pessoal', classeId: '3' },
  {
    numero: '37',
    name: 'Outros valores a reber e a pagar',
    classeId: '3',
  },
  {
    numero: '38',
    name: 'Previs es para cobra as duvidosas',
    classeId: '3',
  },
  {
    numero: '39',
    name: 'Previs es para outros riscos e encargos',
    classeId: '3',
  },
  { numero: '41', name: 'T tulos negoci veis', classeId: '4' },
  { numero: '42', name: 'Dep sitos a prazo', classeId: '4' },
  { numero: '43', name: 'Dep sitos a  rdem', classeId: '4' },
  { numero: '44', name: 'Outros dep sitos', classeId: '4' },
  { numero: '45', name: 'Caixa', classeId: '4' },
  {
    numero: '46',
    name: '---------------------------- -',
    classeId: '4',
  },
  {
    numero: '47',
    name: '---------------------------- -',
    classeId: '4',
  },
  { numero: '48', name: 'Conta transit ria', classeId: '4' },
  {
    numero: '49',
    name: 'Previs es para aplica  es de tesouraria',
    classeId: '4',
  },
  { numero: '51', name: 'Capital', classeId: '5' },
  {
    numero: '52',
    name: 'Ac  es / quotas pr prias',
    classeId: '5',
  },

  { numero: '53', name: 'Pr mios de emiss o', classeId: '5' },
  {
    numero: '54',
    name: 'Presta  es suplementares',
    classeId: '5',
  },
  { numero: '55', name: 'Reservas legais', classeId: '5' },
  { numero: '56', name: 'Reservas de reavalia  o', classeId: '5' },
  {
    numero: '57',
    name: 'Reservas com fins especiais',
    classeId: '5',
  },
  { numero: '58', name: 'Reservas livres', classeId: '5' },

  {
    numero: '59',
    name: '---------------------------- -',
    classeId: '5',
  },
  { numero: '61', name: 'Vendas', classeId: '6' },
  { numero: '62', name: 'Presta  o de servi os', classeId: '6' },
  {
    numero: '63',
    name: 'Outros proveitos operacionais',
    classeId: '6',
  },
  {
    numero: '64',
    name: 'Varia  o nos invent rios de produtos acabados e de produ  o em curso',
    classeId: '6',
  },
  {
    numero: '65',
    name: 'Trabalhos para pr pria empresa',
    classeId: '6',
  },
  {
    numero: '66',
    name: 'Proveitos e ganhos financeiros gerais',
    classeId: '6',
  },
  {
    numero: '67',
    name: 'Proveitos e ganhos financeiros em subsidi rias e associadas',
    classeId: '6',
  },
  {
    numero: '68',
    name: 'Outros proveitos e ganhos n o operacionais',
    classeId: '6',
  },
  {
    numero: '69',
    name: 'Proveitos e ganhos extraordin rios',
    classeId: '6',
  },
  {
    numero: '71',
    name: 'Custos das exist ncias vendidas',
    classeId: '7',
  },
  { numero: '72', name: 'Custos com o pessoal', classeId: '7' },
  {
    numero: '73',
    name: 'Amortiza  o do exerc cio',
    classeId: '7',
  },
  {
    numero: '75',
    name: 'Outros custos e perdas operacionais',
    classeId: '7',
  },
  {
    numero: '76',
    name: 'Custos e perdas financeiros gerais',
    classeId: '7',
  },
  {
    numero: '77',
    name: 'Custos e perdas financeiros em filiais e associadas',
    classeId: '7',
  },
  {
    numero: '78',
    name: 'Outros custos e perdas n o operacionais',
    classeId: '7',
  },
  {
    numero: '79',
    name: 'Custos e perdas extra ordinarios',
    classeId: '7',
  },
  { numero: '81', name: 'Resultados transitados', classeId: '8' },
  { numero: '82', name: 'Resultados operacionais', classeId: '8' },
  { numero: '83', name: 'Resultados financeiros', classeId: '8' },
  {
    numero: '84',
    name: 'Resultados financeiros em filiais e associadas',
    classeId: '8',
  },
  {
    numero: '85',
    name: 'Resultados no operacionais',
    classeId: '8',
  },
  {
    numero: '86',
    name: 'Resultados extra ordinários',
    classeId: '8',
  },
  { numero: '87', name: 'Imposto sobre os lucros', classeId: '8' },
  {
    numero: '88',
    name: 'Resultado l quido do exercício',
    classeId: '8',
  },
  { numero: '89', name: 'Dividendos antecipados', classeId: '8' },
]

export async function seedConta() {
  const count = await prisma.conta.count()
  if (count > 0) return

  for (const itemCount of account) {
    await prisma.conta.create({
      data: {
        name: itemCount.name,
        numero: Number(itemCount.numero),
        estado: 'INATIVO',
        classeId: parseInt(itemCount.classeId),
      },
    })
  }
}
