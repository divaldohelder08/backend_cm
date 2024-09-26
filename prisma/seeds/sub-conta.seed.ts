import { prisma } from '@/lib/prisma'

const subContas = [
  {
    numero: '11.1',
    description: 'Terrenos e recursos naturais',
    N_Conta: 11,
  },
  {
    numero: '11.1.1',
    description: 'Terrenos em bruto',
    N_Conta: 11,
  },
  {
    numero: '11.1.2',
    description: 'Terrenos com arranjos',
    N_Conta: 11,
  },
  {
    numero: '11.1.3',
    description: 'Subsolos',
    N_Conta: 11,
  },
  {
    numero: '11.1.4',
    description: 'Terrenos com edifícios',
    N_Conta: 11,
  },
  {
    numero: '11.1.4.1',
    description: 'Relativos a edifícios industriais',
    N_Conta: 11,
  },
  {
    numero: '11.1.4.2',
    description: 'Relativos a edifícios administrativos e comerciais',
    N_Conta: 11,
  },
  {
    numero: '11.1.4.3',
    description: 'Relativos a outros edifícios',
    N_Conta: 11,
  },
  {
    numero: '11.2',
    description: 'Edifícios e outras construções',
    N_Conta: 11,
  },
  {
    numero: '11.2.1',
    description: 'Edifícios',
    N_Conta: 11,
  },
  {
    numero: '11.2.1.1',
    description: 'Integrados em conjuntos industriais',
    N_Conta: 11,
  },
  {
    numero: '11.2.1.2',
    description: 'Integrados em conjuntos administrativos e comerciais',
    N_Conta: 11,
  },
  {
    numero: '11.2.1.3',
    description: 'Outros conjuntos industriais',
    N_Conta: 11,
  },
  {
    numero: '11.2.1.4',
    description: 'Implatados em propriedade alheia',
    N_Conta: 11,
  },
  {
    numero: '11.2.2',
    description: 'Outras construções',
    N_Conta: 11,
  },
  {
    numero: '11.2.3',
    description: 'Instalações',
    N_Conta: 11,
  },
  {
    numero: '11.3',
    description: 'Equipamento básico',
    N_Conta: 11,
  },
  {
    numero: '11.3.1',
    description: 'Material industrial',
    N_Conta: 11,
  },
  {
    numero: '11.3.2',
    description: 'Ferramentas industriais',
    N_Conta: 11,
  },
  {
    numero: '11.3.3',
    description: 'Melhoramento em equipamentos básicos',
    N_Conta: 11,
  },
  {
    numero: '11.4',
    description: 'Equipamento de carga e transporte',
    N_Conta: 11,
  },
  {
    numero: '11.4.1',
    description: '-----------------------------',
    N_Conta: 11,
  },
  {
    numero: '11.5',
    description: 'Equipamento administrativo',
    N_Conta: 11,
  },
  {
    numero: '11.6',
    description: 'Taras e vasilhame',
    N_Conta: 11,
  },
  {
    numero: '11.6.1',
    description: '-----------------------------',
    N_Conta: 11,
  },
  {
    numero: '11.9',
    description: 'Outras imobilizações corpóreas',
    N_Conta: 11,
  },
  {
    numero: '12.1',
    description: 'Trespasses',
    N_Conta: 12,
  },
  {
    numero: '12.1.1',
    description: '-----------------------------',
    N_Conta: 12,
  },
  {
    numero: '12.2',
    description: 'Despesas de investigação e desenvolvimento',
    N_Conta: 12,
  },
  {
    numero: '12.2.1',
    description: '-----------------------------',
    N_Conta: 12,
  },
  {
    numero: '12.4',
    description: 'Despesas de construção',
    N_Conta: 12,
  },
  {
    numero: '12.9',
    description: 'Outras imobilizações incorpóreas',
    N_Conta: 12,
  },
  {
    numero: '13.1',
    description: 'Empresa subsidiárias',
    N_Conta: 13,
  },
  {
    numero: '13.1.1',
    description: 'Partes de capital',
    N_Conta: 13,
  },
  {
    numero: '13.1.2',
    description: 'Obrigações e títulos de participação',
    N_Conta: 13,
  },
  {
    numero: '13.1.3',
    description: 'Empréstimos',
    N_Conta: 13,
  },
  {
    numero: '13.2',
    description: 'Empresas associadas',
    N_Conta: 13,
  },
  {
    numero: '13.2.1',
    description: 'Partes de capital',
    N_Conta: 13,
  },
  {
    numero: '13.2.2',
    description: 'Obrigações e títulos de participação',
    N_Conta: 13,
  },
  {
    numero: '13.2.3',
    description: 'Empréstimos',
    N_Conta: 13,
  },
  {
    numero: '13.4',
    description: 'Investimentos em imóveis',
    N_Conta: 13,
  },
  {
    numero: '13.4.1',
    description: '-----------------------------',
    N_Conta: 13,
  },
  {
    numero: '13.5',
    description: 'Fundos',
    N_Conta: 13,
  },
  {
    numero: '13.5.1',
    description: '-----------------------------',
    N_Conta: 13,
  },
  {
    numero: '13.9',
    description: 'Outros investimentos financeiros',
    N_Conta: 13,
  },
  {
    numero: '13.9.1',
    description: 'Diamantes',
    N_Conta: 13,
  },
  {
    numero: '13.9.2',
    description: 'Ouros',
    N_Conta: 13,
  },
  {
    numero: '13.9.3',
    description: 'Depósitos bancários',
    N_Conta: 13,
  },
  {
    numero: '14.1',
    description: 'Obras em curso',
    N_Conta: 14,
  },
  {
    numero: '14.2',
    description: 'Obras em curso',
    N_Conta: 14,
  },
  {
    numero: '14.7',
    description: 'Adiantamento por conta do imobilizado corpóreo',
    N_Conta: 14,
  },
  {
    numero: '14.7.1',
    description: '-----------------------------',
    N_Conta: 14,
  },
  {
    numero: '14.8',
    description: 'Adiantamento por conta do imobilizado incorpóreo',
    N_Conta: 14,
  },
  {
    numero: '14.8.1',
    description: '-----------------------------',
    N_Conta: 14,
  },
  {
    numero: '14.9',
    description: 'Adiantamento por conta do investimentos financeiros',
    N_Conta: 14,
  },
  {
    numero: '14.9.1',
    description: '-----------------------------',
    N_Conta: 14,
  },
  {
    numero: '18.1',
    description: 'Amortizações corpóreas',
    N_Conta: 18,
  },
  {
    numero: '18.1.1',
    description: 'Terrenos e recursos naturais',
    N_Conta: 18,
  },
  {
    numero: '18.1.2',
    description: 'Edifícios e outras construções',
    N_Conta: 18,
  },
  {
    numero: '18.1.3',
    description: 'Equipamento básico',
    N_Conta: 18,
  },
  {
    numero: '18.1.4',
    description: 'Equipamento de carga e transporte',
    N_Conta: 18,
  },
  {
    numero: '18.1.5',
    description: 'Equipamento administrativo',
    N_Conta: 18,
  },
  {
    numero: '18.1.6',
    description: 'Taras e vasilhame',
    N_Conta: 18,
  },
  {
    numero: '18.1.9',
    description: 'Outras imobilizações corpóreas',
    N_Conta: 18,
  },
  {
    numero: '19.1',
    description: 'Empresas subsidiárias',
    N_Conta: 19,
  },
  {
    numero: '19.1.1',
    description: 'Partes de capital',
    N_Conta: 19,
  },
  {
    numero: '19.1.2',
    description: 'Obrigações e títulos de participação',
    N_Conta: 19,
  },
  {
    numero: '19.1.3',
    description: 'Emprestimos',
    N_Conta: 19,
  },
  {
    numero: '19.2',
    description: 'Empresas associadas',
    N_Conta: 19,
  },
  {
    numero: '19.2.1',
    description: 'Partes de capital',
    N_Conta: 19,
  },
  {
    numero: '19.2.2',
    description: 'Obrigações e títulos de participação',
    N_Conta: 19,
  },
  {
    numero: '19.2.3',
    description: 'Emprestimos',
    N_Conta: 19,
  },
  {
    numero: '19.3',
    description: 'Outras empresas',
    N_Conta: 19,
  },
  {
    numero: '19.3.1',
    description: 'Partes de capital',
    N_Conta: 19,
  },
  {
    numero: '19.3.2',
    description: 'Obrigações e títulos de participação',
    N_Conta: 19,
  },
  {
    numero: '19.3.3',
    description: 'Emprestimos',
    N_Conta: 19,
  },
  {
    numero: '19.4',
    description: 'Fundos',
    N_Conta: 19,
  },
  {
    numero: '19.4.1',
    description: 'Partes de capital',
    N_Conta: 19,
  },
  {
    numero: '19.9',
    description: 'Outros investimentos financeiros',
    N_Conta: 19,
  },
  {
    numero: '19.9.1',
    description: 'Diamantes',
    N_Conta: 19,
  },
  {
    numero: '19.9.2',
    description: 'Ouros',
    N_Conta: 19,
  },
  {
    numero: '19.9.3',
    description: 'Depósitos bancários',
    N_Conta: 19,
  },
  {
    numero: '21.1',
    description: 'Matérias primas, subsidiárias e de consumo',
    N_Conta: 21,
  },
  {
    numero: '21.1.1',
    description: '-----------------------------',
    N_Conta: 21,
  },
  {
    numero: '21.2',
    description: 'Mercadorias',
    N_Conta: 21,
  },
  {
    numero: '21.7',
    description: 'Devoluções de compras',
    N_Conta: 21,
  },
  {
    numero: '21.7.1',
    description: '-----------------------------',
    N_Conta: 21,
  },
  {
    numero: '21.8',
    description: 'Desconto e abatimento de compras',
    N_Conta: 21,
  },
  {
    numero: '22.1',
    description: 'Matérias - primas',
    N_Conta: 22,
  },
  {
    numero: '22.2',
    description: 'Matérias - subsidiárias',
    N_Conta: 22,
  },
  {
    numero: '22.3',
    description: 'Matériais diversos',
    N_Conta: 22,
  },
  {
    numero: '22.4',
    description: 'Embalagens de consumo',
    N_Conta: 22,
  },
  {
    numero: '22.5',
    description: 'Outros matériais',
    N_Conta: 22,
  },
  {
    numero: '23.1',
    description: 'Produtos e trabalhos em curso',
    N_Conta: 23,
  },
  {
    numero: '23.2',
    description: '-----------------------------',
    N_Conta: 23,
  },
  {
    numero: '24.1',
    description: 'Produtos acabados',
    N_Conta: 24,
  },
  {
    numero: '24.1.1',
    description: '-----------------------------',
    N_Conta: 24,
  },
  {
    numero: '24.2',
    description: 'Produtos intermédios',
    N_Conta: 24,
  },
  {
    numero: '24.2.1',
    description: '-----------------------------',
    N_Conta: 24,
  },
  {
    numero: '24.9',
    description: 'Em poder de terceiros',
    N_Conta: 24,
  },
  {
    numero: '24.9.1',
    description: '-----------------------------',
    N_Conta: 24,
  },
  {
    numero: '25.1',
    description: 'Subprodutos',
    N_Conta: 25,
  },
  {
    numero: '25.1.1',
    description: '-----------------------------',
    N_Conta: 25,
  },
  {
    numero: '25.2',
    description: 'Desperdícios, resíduos e refugos',
    N_Conta: 25,
  },
  {
    numero: '25.2.1',
    description: '-----------------------------',
    N_Conta: 25,
  },
  {
    numero: '26.1',
    description: 'Mercadorias',
    N_Conta: 26,
  },
  {
    numero: '26.2',
    description: '-----------------------------',
    N_Conta: 26,
  },
  {
    numero: '26.9',
    description: 'Em poder de terceiros',
    N_Conta: 26,
  },
  {
    numero: '26.9.1',
    description: '-----------------------------',
    N_Conta: 26,
  },
  {
    numero: '28.1',
    description: 'Materias - primas e outros materiais',
    N_Conta: 28,
  },
  {
    numero: '28.1.1',
    description: '-----------------------------',
    N_Conta: 28,
  },
  {
    numero: '28.2',
    description: 'Mercadorias',
    N_Conta: 28,
  },
  {
    numero: '28.2.1',
    description: '-----------------------------',
    N_Conta: 28,
  },
  {
    numero: '29.1',
    description: 'Previsão para depreciação de existências',
    N_Conta: 29,
  },
  {
    numero: '29.2',
    description: 'Materias - primas, subsidiárias e de consumo',
    N_Conta: 29,
  },
  {
    numero: '29.2.1',
    description: '-----------------------------',
    N_Conta: 29,
  },
  {
    numero: '29.3',
    description: 'Produtos e trabalhos em curso',
    N_Conta: 29,
  },
  {
    numero: '29.3.1',
    description: '-----------------------------',
    N_Conta: 29,
  },
  {
    numero: '29.4',
    description: 'Produtos acabados e intermédios',
    N_Conta: 29,
  },
  {
    numero: '29.4.1',
    description: '-----------------------------',
    N_Conta: 29,
  },
  {
    numero: '29.5',
    description: 'Subprodutos, desperdícios, resíduos e refugos',
    N_Conta: 29,
  },
  {
    numero: '29.5.1',
    description: '-----------------------------',
    N_Conta: 29,
  },
  {
    numero: '29.6',
    description: 'Mercadorias',
    N_Conta: 29,
  },
  {
    numero: '29.6.1',
    description: '-----------------------------',
    N_Conta: 29,
  },
  {
    numero: '31.1',
    description: 'Clientes - correntes',
    N_Conta: 31,
  },
  {
    numero: '31.1.1',
    description: 'Grupo',
    N_Conta: 31,
  },
  {
    numero: '31.1.1.1',
    description: 'Subsidiárias',
    N_Conta: 31,
  },
  {
    numero: '31.1.1.2',
    description: 'Associadas',
    N_Conta: 31,
  },
  {
    numero: '31.2',
    description: 'Clientes - títulos a receber',
    N_Conta: 31,
  },
  {
    numero: '31.2.1',
    description: 'Grupo',
    N_Conta: 31,
  },
  {
    numero: '31.2.1.1',
    description: 'Subsidiárias',
    N_Conta: 31,
  },
  {
    numero: '31.2.1.2',
    description: 'Associadas',
    N_Conta: 31,
  },
  {
    numero: '31.2.2',
    description: 'Não grupo',
    N_Conta: 31,
  },
  {
    numero: '31.2.2.1',
    description: 'Nacionais',
    N_Conta: 31,
  },
  {
    numero: '31.2.2.2',
    description: 'Estrangeiros',
    N_Conta: 31,
  },
  {
    numero: '31.3',
    description: 'Clientes - títulos a descontados',
    N_Conta: 31,
  },
  {
    numero: '31.3.1',
    description: 'Grupo',
    N_Conta: 31,
  },
  {
    numero: '31.3.1.1',
    description: 'Subsidiárias',
    N_Conta: 31,
  },
  {
    numero: '31.3.1.2',
    description: 'Associadas',
    N_Conta: 31,
  },
  {
    numero: '31.3.2',
    description: 'Não grupo',
    N_Conta: 31,
  },
  {
    numero: '31.3.2.1',
    description: 'Nacionais',
    N_Conta: 31,
  },
  {
    numero: '31.3.2.2',
    description: 'estrangeiros',
    N_Conta: 31,
  },
  {
    numero: '31.8',
    description: 'Clientes de cobrança duvidosa',
    N_Conta: 31,
  },
  {
    numero: '31.8.1',
    description: 'Clientes - correntes',
    N_Conta: 31,
  },
  {
    numero: '31.8.2',
    description: 'Clientes - títulos',
    N_Conta: 31,
  },
  {
    numero: '31.9',
    description: 'Clientes - saldos credores',
    N_Conta: 31,
  },
  {
    numero: '31.9.1',
    description: 'Adiantamentos',
    N_Conta: 31,
  },
  {
    numero: '31.9.2',
    description: 'Embalagens a devolver',
    N_Conta: 31,
  },
  {
    numero: '31.9.3',
    description: 'Material a consignação',
    N_Conta: 31,
  },
  {
    numero: '32.1',
    description: 'Fornecedores - correntes',
    N_Conta: 32,
  },
  {
    numero: '32.1.1',
    description: 'Grupo',
    N_Conta: 32,
  },
  {
    numero: '32.1.1.1',
    description: 'Subsidiárias',
    N_Conta: 32,
  },
  {
    numero: '32.1.1.2',
    description: 'Associadas',
    N_Conta: 32,
  },
  {
    numero: '32.1.2',
    description: 'Não grupo',
    N_Conta: 32,
  },
  {
    numero: '32.1.2.1',
    description: 'Nacionais',
    N_Conta: 32,
  },
  {
    numero: '32.1.2.2',
    description: 'Estrangeiros',
    N_Conta: 32,
  },
  {
    numero: '32.2',
    description: 'Fornecedores - títulos a pagar',
    N_Conta: 32,
  },
  {
    numero: '32.2.1',
    description: 'Grupo',
    N_Conta: 32,
  },
  {
    numero: '32.2.1.1',
    description: 'Subsidiárias',
    N_Conta: 32,
  },
  {
    numero: '32.2.1.2',
    description: 'Associadas',
    N_Conta: 32,
  },
  {
    numero: '32.2.2',
    description: 'Não grupo',
    N_Conta: 32,
  },
  {
    numero: '32.2.2.1',
    description: 'Nacionais',
    N_Conta: 32,
  },
  {
    numero: '32.2.2.2',
    description: 'Estrangeiros',
    N_Conta: 32,
  },
  {
    numero: '32.8',
    description: 'Fornecedores - facturas em recepção e conferência',
    N_Conta: 32,
  },
  {
    numero: '32.8.1',
    description: '-----------------------------',
    N_Conta: 32,
  },
  {
    numero: '32.9',
    description: 'Fornecedores - saldos devedores',
    N_Conta: 32,
  },
  {
    numero: '32.9.1',
    description: 'Adiantamento',
    N_Conta: 32,
  },
  {
    numero: '32.9.2',
    description: 'Embalagens a devolver',
    N_Conta: 32,
  },
  {
    numero: '32.9.3',
    description: 'Material à consignação',
    N_Conta: 32,
  },
  {
    numero: '33.1',
    description: 'Empréstimos bancários',
    N_Conta: 33,
  },
  {
    numero: '33.1.1',
    description: 'Moeda nacional',
    N_Conta: 33,
  },
  {
    numero: '33.1.1.1',
    description: 'Banco A',
    N_Conta: 33,
  },
  {
    numero: '33.1.1.2',
    description: 'Banco B',
    N_Conta: 33,
  },
  {
    numero: '33.1.2',
    description: 'Moeda estrangeira',
    N_Conta: 33,
  },
  {
    numero: '33.1.2.1',
    description: 'Banco X',
    N_Conta: 33,
  },
  {
    numero: '33.2',
    description: 'Empréstimos por obrigações',
    N_Conta: 33,
  },
  {
    numero: '33.2.1',
    description: 'Convertíveis',
    N_Conta: 33,
  },
  {
    numero: '33.2.1.1',
    description: 'Entidade',
    N_Conta: 33,
  },
  {
    numero: '33.2.2',
    description: 'Não convertíveis',
    N_Conta: 33,
  },
  {
    numero: '33.2.2.1',
    description: 'Entidade',
    N_Conta: 33,
  },
  {
    numero: '33.3',
    description: 'Empréstimos por títulos de participação',
    N_Conta: 33,
  },
  {
    numero: '33.3.1',
    description: 'Entidade',
    N_Conta: 33,
  },
  {
    numero: '33.9',
    description: 'Outros empréstimos obtidos',
    N_Conta: 33,
  },
  {
    numero: '33.9.1',
    description: 'Entidade',
    N_Conta: 33,
  },
  {
    numero: '34.1',
    description: 'Imposto sobre os lucros',
    N_Conta: 34,
  },
  {
    numero: '34.1.1',
    description: '-----------------------------',
    N_Conta: 34,
  },
  {
    numero: '34.2',
    description: 'Imposto de produção e consumo',
    N_Conta: 34,
  },
  {
    numero: '34.2.1',
    description: '-----------------------------',
    N_Conta: 34,
  },
  {
    numero: '34.3',
    description: 'Imposto de rendimento de trabalho',
    N_Conta: 34,
  },
  {
    numero: '34.3.1',
    description: '-----------------------------',
    N_Conta: 34,
  },
  {
    numero: '34.4',
    description: 'Imposto de circulação',
    N_Conta: 34,
  },
  {
    numero: '34.4.1',
    description: '-----------------------------',
    N_Conta: 34,
  },
  {
    numero: '34.8',
    description: 'Subsídios a preços',
    N_Conta: 34,
  },
  {
    numero: '34.8.1',
    description: '-----------------------------',
    N_Conta: 34,
  },
  {
    numero: '34.9',
    description: 'Outros imposto',
    N_Conta: 34,
  },
  {
    numero: '34.9.1',
    description: '-----------------------------',
    N_Conta: 34,
  },
  {
    numero: '35.1',
    description: 'Entidades participantes',
    N_Conta: 35,
  },
  {
    numero: '35.1.1',
    description: 'Estado',
    N_Conta: 35,
  },
  {
    numero: '35.1.1.1',
    description: 'C/subcrição',
    N_Conta: 35,
  },
  {
    numero: '35.1.1.2',
    description: 'C/adiantamentos sobre lucros',
    N_Conta: 35,
  },
  {
    numero: '35.1.1.3',
    description: 'C/lucros',
    N_Conta: 35,
  },
  {
    numero: '35.1.1.4',
    description: 'Empréstimos',
    N_Conta: 35,
  },
  {
    numero: '35.2',
    description: 'Entidades participadas',
    N_Conta: 35,
  },
  {
    numero: '35.2.1',
    description: 'Estado',
    N_Conta: 35,
  },
  {
    numero: '35.2.1.1',
    description: 'C/subcrição',
    N_Conta: 35,
  },
  {
    numero: '35.2.1.2',
    description: 'C/adiantamentos sobre lucros',
    N_Conta: 35,
  },
  {
    numero: '35.2.1.3',
    description: 'C/lucros',
    N_Conta: 35,
  },
  {
    numero: '35.2.1.4',
    description: 'Empréstimos',
    N_Conta: 35,
  },
  {
    numero: '35.2.2',
    description: 'Empresas do grupo - subsidiárias',
    N_Conta: 35,
  },
  {
    numero: '35.2.2.1',
    description: 'C/subcrição',
    N_Conta: 35,
  },
  {
    numero: '35.2.2.2',
    description: 'C/adiantamentos sobre lucros',
    N_Conta: 35,
  },
  {
    numero: '35.2.2.3',
    description: 'C/lucros',
    N_Conta: 35,
  },
  {
    numero: '35.2.2.4',
    description: 'Empréstimos',
    N_Conta: 35,
  },
  {
    numero: '35.2.3',
    description: 'Empresas do grupo - associadas',
    N_Conta: 35,
  },
  {
    numero: '35.2.3.1',
    description: 'C/subcrição',
    N_Conta: 35,
  },
  {
    numero: '35.2.3.2',
    description: 'C/adiantamentos sobre lucros',
    N_Conta: 35,
  },
  {
    numero: '35.2.3.3',
    description: 'C/lucros',
    N_Conta: 35,
  },
  {
    numero: '35.2.3.4',
    description: 'Empréstimos',
    N_Conta: 35,
  },
  {
    numero: '35.2.4',
    description: 'Outros',
    N_Conta: 35,
  },
  {
    numero: '35.2.4.1',
    description: 'C/subcrição',
    N_Conta: 35,
  },
  {
    numero: '35.2.4.2',
    description: 'C/adiantamentos sobre lucros',
    N_Conta: 35,
  },
  {
    numero: '35.2.4.3',
    description: 'C/lucros',
    N_Conta: 35,
  },
  {
    numero: '35.2.4.4',
    description: 'Empréstimos',
    N_Conta: 35,
  },
  {
    numero: '36.1',
    description: 'Pessoal - remunerações',
    N_Conta: 36,
  },
  {
    numero: '36.1.1',
    description: 'Órgãos sociais',
    N_Conta: 36,
  },
  {
    numero: '36.1.1.1',
    description: '-----------------------------',
    N_Conta: 36,
  },
  {
    numero: '36.1.2',
    description: 'Empregados',
    N_Conta: 36,
  },
  {
    numero: '36.1.2.1',
    description: '-----------------------------',
    N_Conta: 36,
  },
  {
    numero: '36.2',
    description: 'Pessoal - participação nos resultados',
    N_Conta: 36,
  },
  {
    numero: '36.2.1',
    description: 'Órgãos sociais',
    N_Conta: 36,
  },
  {
    numero: '36.2.1.1',
    description: '-----------------------------',
    N_Conta: 36,
  },
  {
    numero: '36.2.2',
    description: 'Empregados',
    N_Conta: 36,
  },
  {
    numero: '36.2.2.1',
    description: '-----------------------------',
    N_Conta: 36,
  },
  {
    numero: '36.3',
    description: 'Pessoal - adiantamentos',
    N_Conta: 36,
  },
  {
    numero: '36.3.1',
    description: '-----------------------------',
    N_Conta: 36,
  },
  {
    numero: '36.9',
    description: 'Pessoal - outros',
    N_Conta: 36,
  },
  {
    numero: '36.9.1',
    description: '-----------------------------',
    N_Conta: 36,
  },
  {
    numero: '37.1',
    description: 'Compras do imobilizado',
    N_Conta: 37,
  },
  {
    numero: '37.1.1',
    description: 'Corpóreo',
    N_Conta: 37,
  },
  {
    numero: '37.1.2',
    description: 'Incorpóreo',
    N_Conta: 37,
  },
  {
    numero: '37.1.3',
    description: 'Financeiro',
    N_Conta: 37,
  },
  {
    numero: '37.2',
    description: 'Vendas do imobilizado',
    N_Conta: 37,
  },
  {
    numero: '37.2.1',
    description: 'Corpóreo',
    N_Conta: 37,
  },
  {
    numero: '37.2.2',
    description: 'Incorpóreo',
    N_Conta: 37,
  },
  {
    numero: '37.2.3',
    description: 'Financeiro',
    N_Conta: 37,
  },
  {
    numero: '37.3',
    description: 'Proveitos a facturar',
    N_Conta: 37,
  },
  {
    numero: '37.3.1',
    description: 'Vendas',
    N_Conta: 37,
  },
  {
    numero: '37.3.2',
    description: 'Prestações de serviços',
    N_Conta: 37,
  },
  {
    numero: '37.3.3',
    description: 'Juros',
    N_Conta: 37,
  },
  {
    numero: '37.4',
    description: 'Encargos a repartir por periodos futuros',
    N_Conta: 37,
  },
  {
    numero: '37.4.1',
    description: 'Desconto de emissão de obrigações',
    N_Conta: 37,
  },
  {
    numero: '37.4.2',
    description: 'Desconto de emissão de títulos de participação',
    N_Conta: 37,
  },
  {
    numero: '37.5',
    description: 'Encargos a pagar',
    N_Conta: 37,
  },
  {
    numero: '37.5.1',
    description: 'Remunerações',
    N_Conta: 37,
  },
  {
    numero: '37.5.2',
    description: 'Juros',
    N_Conta: 37,
  },
  {
    numero: '37.6',
    description: 'Proveitos a repartir por periodos futuros',
    N_Conta: 37,
  },
  {
    numero: '37.6.1',
    description: 'Prémios de emissão de obrigações',
    N_Conta: 37,
  },
  {
    numero: '37.6.2',
    description: 'Prémios de emissão de títulos de participação',
    N_Conta: 37,
  },
  {
    numero: '37.6.3',
    description: 'Subsídios para investimento',
    N_Conta: 37,
  },
  {
    numero: '37.6.4',
    description: 'Diferenças de câmbio favoráveis reversíveis',
    N_Conta: 37,
  },
  {
    numero: '37.7',
    description: 'Contas transitórias',
    N_Conta: 37,
  },
  {
    numero: '37.7.1',
    description: 'Transações entre a sede e as dependências da empresa',
    N_Conta: 37,
  },
  {
    numero: '37.9',
    description: 'Outros valores a receber e a pagar',
    N_Conta: 37,
  },
  {
    numero: '37.9.1',
    description: '-----------------------------',
    N_Conta: 37,
  },
  {
    numero: '38.1',
    description: 'Provisões para clientes',
    N_Conta: 38,
  },
  {
    numero: '38.1.1',
    description: 'Clientes - correntes',
    N_Conta: 38,
  },
  {
    numero: '38.1.1.1',
    description: 'Grupo',
    N_Conta: 38,
  },
  {
    numero: '38.1.1.2',
    description: 'Não grupo',
    N_Conta: 38,
  },
  {
    numero: '38.1.3',
    description: 'Clientes - cobrança duvidosa',
    N_Conta: 38,
  },
  {
    numero: '38.1.3.1',
    description: 'Grupo',
    N_Conta: 38,
  },
  {
    numero: '38.1.3.2',
    description: 'Não grupo',
    N_Conta: 38,
  },
  {
    numero: '38.2',
    description: 'Provisões para saldos devedores de fornecedores',
    N_Conta: 38,
  },
  {
    numero: '38.2.1',
    description: '-----------------------------',
    N_Conta: 38,
  },
  {
    numero: '38.3',
    description: 'Provisões para participantes e participadas',
    N_Conta: 38,
  },
  {
    numero: '38.3.1',
    description: 'Participantes',
    N_Conta: 38,
  },
  {
    numero: '38.3.2',
    description: 'Participadas',
    N_Conta: 38,
  },
  {
    numero: '38.4',
    description: 'Provisões para dívida do pessoal',
    N_Conta: 38,
  },
  {
    numero: '38.4.1',
    description: '-----------------------------',
    N_Conta: 38,
  },
  {
    numero: '38.9',
    description: 'Provisões para outros saldos a receber',
    N_Conta: 38,
  },
  {
    numero: '38.9.1',
    description: 'Vendas de imobilizado',
    N_Conta: 38,
  },
  {
    numero: '39.1',
    description: 'Provisões para pensões',
    N_Conta: 39,
  },
  {
    numero: '39.1.1',
    description: '-----------------------------',
    N_Conta: 39,
  },
  {
    numero: '39.2',
    description: 'Provisões para processos judiciais em curso',
    N_Conta: 39,
  },
  {
    numero: '39.2.1',
    description: '-----------------------------',
    N_Conta: 39,
  },
  {
    numero: '39.3',
    description: 'Provisões para acidentes de trabalho',
    N_Conta: 39,
  },
  {
    numero: '39.3.1',
    description: '-----------------------------',
    N_Conta: 39,
  },
  {
    numero: '39.4',
    description: 'Provisões para garantias dadas a clientes',
    N_Conta: 39,
  },
  {
    numero: '39.4.1',
    description: '-----------------------------',
    N_Conta: 39,
  },
  {
    numero: '39.9',
    description: 'Provisões para outros riscos e encargos',
    N_Conta: 39,
  },
  {
    numero: '39.9.1',
    description: '-----------------------------',
    N_Conta: 39,
  },
  {
    numero: '41.1',
    description: 'Acções',
    N_Conta: 41,
  },
  {
    numero: '41.1.1',
    description: 'Empresas do grupo',
    N_Conta: 41,
  },
  {
    numero: '41.1.2',
    description: 'Associadas',
    N_Conta: 41,
  },
  {
    numero: '41.1.3',
    description: 'Outras empresas',
    N_Conta: 41,
  },
  {
    numero: '41.2',
    description: 'Obrigações',
    N_Conta: 41,
  },
  {
    numero: '41.2.2',
    description: 'Associadas',
    N_Conta: 41,
  },
  {
    numero: '41.2.3',
    description: 'Outras empresas',
    N_Conta: 41,
  },
  {
    numero: '41.3',
    description: '´Título da dívida pública',
    N_Conta: 41,
  },
  {
    numero: '41.3.1',
    description: '-----------------------------',
    N_Conta: 41,
  },
  {
    numero: '42.1',
    description: 'Moeda nacional',
    N_Conta: 42,
  },
  {
    numero: '42.1.1',
    description: 'Banco...',
    N_Conta: 42,
  },
  {
    numero: '42.1.2',
    description: 'Banco...',
    N_Conta: 42,
  },
  {
    numero: '42.2',
    description: 'Moeda estrangeira',
    N_Conta: 42,
  },
  {
    numero: '42.2.1',
    description: 'Banco...',
    N_Conta: 42,
  },
  {
    numero: '42.2.2',
    description: 'Banco...',
    N_Conta: 42,
  },
  {
    numero: '43.1',
    description: 'Moeda nacional',
    N_Conta: 43,
  },
  {
    numero: '43.1.1',
    description: 'Banco...',
    N_Conta: 43,
  },
  {
    numero: '43.1.2',
    description: 'Banco...',
    N_Conta: 43,
  },
  {
    numero: '43.2',
    description: 'Moeda estrangeira',
    N_Conta: 43,
  },
  {
    numero: '43.2.1',
    description: 'Banco...',
    N_Conta: 43,
  },
  {
    numero: '43.2.2',
    description: 'Banco...',
    N_Conta: 43,
  },
  {
    numero: '44.1',
    description: 'Moeda nacional',
    N_Conta: 44,
  },
  {
    numero: '44.1.1',
    description: 'Banco...',
    N_Conta: 44,
  },
  {
    numero: '44.1.2',
    description: 'Banco...',
    N_Conta: 44,
  },
  {
    numero: '44.2',
    description: 'Moeda estrangeira',
    N_Conta: 44,
  },
  {
    numero: '44.2.1',
    description: 'Banco...',
    N_Conta: 44,
  },
  {
    numero: '44.2.2',
    description: 'Banco...',
    N_Conta: 44,
  },
  {
    numero: '45.1',
    description: 'Fundo fixo',
    N_Conta: 45,
  },
  {
    numero: '45.1.1',
    description: 'Caixa...',
    N_Conta: 45,
  },
  {
    numero: '45.1.2',
    description: 'Caixa...',
    N_Conta: 45,
  },
  {
    numero: '45.2',
    description: 'Valores para depositar',
    N_Conta: 45,
  },
  {
    numero: '45.2.1',
    description: '-----------------------------',
    N_Conta: 45,
  },
  {
    numero: '45.3',
    description: 'Valores destinados a pagamentos específicos',
    N_Conta: 45,
  },
  {
    numero: '45.3.1',
    description: 'Salários',
    N_Conta: 45,
  },
  {
    numero: '46.1',
    description: '-----------------------------',
    N_Conta: 46,
  },
  {
    numero: '46.1.1',
    description: '-----------------------------',
    N_Conta: 46,
  },
  {
    numero: '47.1',
    description: '-----------------------------',
    N_Conta: 47,
  },
  {
    numero: '47.1.1',
    description: '-----------------------------',
    N_Conta: 47,
  },
  {
    numero: '48.1',
    description: 'Banco...',
    N_Conta: 48,
  },
  {
    numero: '48.2',
    description: 'Banco...',
    N_Conta: 48,
  },
  {
    numero: '49.1',
    description: 'Títulos negociáveis',
    N_Conta: 49,
  },
  {
    numero: '49.1.1',
    description: 'Acções',
    N_Conta: 49,
  },
  {
    numero: '49.1.2',
    description: 'Obrigações',
    N_Conta: 49,
  },
  {
    numero: '49.1.3',
    description: 'Títulos da dívida pública',
    N_Conta: 49,
  },
  {
    numero: '49.2',
    description: 'Outras aplicações de tesoraria',
    N_Conta: 49,
  },
  {
    numero: '49.2.1',
    description: '-----------------------------',
    N_Conta: 49,
  },
  {
    numero: '51.1',
    description: 'Capital',
    N_Conta: 51,
  },
  {
    numero: '52.1',
    description: 'Valor normal',
    N_Conta: 52,
  },
  {
    numero: '52.1.1',
    description: '-----------------------------',
    N_Conta: 52,
  },
  {
    numero: '52.2',
    description: 'Descontos',
    N_Conta: 52,
  },
  {
    numero: '52.2.1',
    description: '-----------------------------',
    N_Conta: 52,
  },
  {
    numero: '52.3',
    description: 'Prémios',
    N_Conta: 52,
  },
  {
    numero: '52.3.1',
    description: '-----------------------------',
    N_Conta: 52,
  },
  {
    numero: '53.1',
    description: 'Prémios de emissão',
    N_Conta: 53,
  },
  {
    numero: '54.1',
    description: 'Prestações suplementares',
    N_Conta: 54,
  },
  {
    numero: '55.1',
    description: 'Reservas legais',
    N_Conta: 55,
  },
  {
    numero: '56.1',
    description: 'Legais',
    N_Conta: 56,
  },
  {
    numero: '56.1.1',
    description: 'Decreto lei nº',
    N_Conta: 56,
  },
  {
    numero: '56.1.2',
    description: 'Decreto lei nº',
    N_Conta: 56,
  },
  {
    numero: '56.2',
    description: 'Autónomas',
    N_Conta: 56,
  },
  {
    numero: '56.2.1',
    description: 'Avaliação',
    N_Conta: 56,
  },
  {
    numero: '56.2.2',
    description: 'Reavalição',
    N_Conta: 56,
  },
  {
    numero: '57.1',
    description: 'Reservas com fins especiais',
    N_Conta: 57,
  },
  {
    numero: '58.1',
    description: 'Reservas livres',
    N_Conta: 58,
  },
  {
    numero: '59.1',
    description: '-----------------------------',
    N_Conta: 59,
  },
  {
    numero: '61.1',
    description: 'Produtos acabados e intermédios',
    N_Conta: 61,
  },
  {
    numero: '61.1.1',
    description: 'Mercado nacional',
    N_Conta: 61,
  },
  {
    numero: '61.1.2',
    description: 'Mercado estrangeiro',
    N_Conta: 61,
  },
  {
    numero: '61.2',
    description: 'Subprodutos, desperdícios, resíduos e refugos',
    N_Conta: 61,
  },
  {
    numero: '61.2.1',
    description: 'Mercado nacional',
    N_Conta: 61,
  },
  {
    numero: '61.2.2',
    description: 'Mercado estrangeiro',
    N_Conta: 61,
  },
  {
    numero: '61.3',
    description: 'Mercadorias',
    N_Conta: 61,
  },
  {
    numero: '61.3.1',
    description: 'Mercado nacional',
    N_Conta: 61,
  },
  {
    numero: '61.3.2',
    description: 'Mercado estrangeiro',
    N_Conta: 61,
  },
  {
    numero: '61.4',
    description: 'Embalagens de consumo',
    N_Conta: 61,
  },
  {
    numero: '61.4.1',
    description: 'Mercado nacional',
    N_Conta: 61,
  },
  {
    numero: '61.4.2',
    description: 'Mercado estrangeiro',
    N_Conta: 61,
  },
  {
    numero: '61.5',
    description: 'Subsídios a preços',
    N_Conta: 61,
  },
  {
    numero: '61.5.1',
    description: '-----------------------------',
    N_Conta: 61,
  },
  {
    numero: '61.7',
    description: 'Devoluções',
    N_Conta: 61,
  },
  {
    numero: '61.7.1',
    description: 'Mercado nacional',
    N_Conta: 61,
  },
  {
    numero: '61.7.2',
    description: 'Mercado estrangeiro',
    N_Conta: 61,
  },
  {
    numero: '61.8',
    description: 'Descontos e abatimentos',
    N_Conta: 61,
  },
  {
    numero: '61.8.1',
    description: 'Mercado nacional',
    N_Conta: 61,
  },
  {
    numero: '61.8.2',
    description: 'Mercado estrangeiro',
    N_Conta: 61,
  },
  {
    numero: '61.9',
    description: 'Transferência para resultados operacionais',
    N_Conta: 61,
  },
  {
    numero: '62.1',
    description: 'Serviços principais',
    N_Conta: 62,
  },
  {
    numero: '62.1.1',
    description: 'Mercado nacional',
    N_Conta: 62,
  },
  {
    numero: '62.1.2',
    description: 'Mercado estrangeiro',
    N_Conta: 62,
  },
  {
    numero: '62.2',
    description: 'Serviços secundários',
    N_Conta: 62,
  },
  {
    numero: '62.2.1',
    description: 'Mercado nacional',
    N_Conta: 62,
  },
  {
    numero: '62.2.2',
    description: 'Mercado estrangeiro',
    N_Conta: 62,
  },
  {
    numero: '62.8',
    description: 'Descontos e abatimentos',
    N_Conta: 62,
  },
  {
    numero: '62.8.1',
    description: 'Mercado nacional',
    N_Conta: 62,
  },
  {
    numero: '62.8.2',
    description: 'Mercado estrangeiro',
    N_Conta: 62,
  },
  {
    numero: '62.9',
    description: 'Transferência para resultados operacionais',
    N_Conta: 62,
  },
  {
    numero: '63.1',
    description: 'Serviços suplementares',
    N_Conta: 63,
  },
  {
    numero: '63.1.1',
    description: 'Aluguer de equipamentos',
    N_Conta: 63,
  },
  {
    numero: '63.1.2',
    description: 'Cedência de pessoal',
    N_Conta: 63,
  },
  {
    numero: '63.1.3',
    description: 'Cedência de energia',
    N_Conta: 63,
  },
  {
    numero: '63.1.4',
    description: 'Estudos. Projectos e assistência técnica',
    N_Conta: 63,
  },
  {
    numero: '63.2',
    description: 'Royalties',
    N_Conta: 63,
  },
  {
    numero: '63.3',
    description: 'Subsídios à exploração',
    N_Conta: 63,
  },
  {
    numero: '63.4',
    description: 'Subsídios ao investimento',
    N_Conta: 63,
  },
  {
    numero: '63.8',
    description: 'Outros proveitos e ganhos operacionais',
    N_Conta: 63,
  },
  {
    numero: '63.8.1',
    description: '-----------------------------',
    N_Conta: 63,
  },
  {
    numero: '63.9',
    description: 'Transferência para resultados operacionais',
    N_Conta: 63,
  },
  {
    numero: '64.1',
    description: 'Produtos e trabalhos em curso',
    N_Conta: 64,
  },
  {
    numero: '64.1.1',
    description: '-----------------------------',
    N_Conta: 64,
  },
  {
    numero: '64.2',
    description: 'Produtos acabados',
    N_Conta: 64,
  },
  {
    numero: '64.2.1',
    description: '-----------------------------',
    N_Conta: 64,
  },
  {
    numero: '64.3',
    description: 'Produtos intermédios',
    N_Conta: 64,
  },
  {
    numero: '64.3.1',
    description: '-----------------------------',
    N_Conta: 64,
  },
  {
    numero: '64.9',
    description: 'Transferência para resultados operacionais',
    N_Conta: 64,
  },
  {
    numero: '65.1',
    description: 'Para imobilizado',
    N_Conta: 65,
  },
  {
    numero: '65.1.1',
    description: 'Corpóreo',
    N_Conta: 65,
  },
  {
    numero: '65.1.2',
    description: 'Incorpóreo',
    N_Conta: 65,
  },
  {
    numero: '65.1.3',
    description: 'Financeiro',
    N_Conta: 65,
  },
  {
    numero: '65.1.4',
    description: 'Em curso',
    N_Conta: 65,
  },
  {
    numero: '65.2',
    description: 'Para encargos a repartir por exércicios futuros',
    N_Conta: 65,
  },
  {
    numero: '65.2.1',
    description: '-----------------------------',
    N_Conta: 65,
  },
  {
    numero: '65.9',
    description: 'Transferência para resultados operacionais',
    N_Conta: 65,
  },
  {
    numero: '66.1',
    description: 'Juros',
    N_Conta: 66,
  },
  {
    numero: '66.1.1',
    description: 'De investimento financeiros',
    N_Conta: 66,
  },
  {
    numero: '66.1.1.1',
    description: 'Obrigações',
    N_Conta: 66,
  },
  {
    numero: '66.1.1.3',
    description: 'Títulos de participação',
    N_Conta: 66,
  },
  {
    numero: '66.1.1.4',
    description: 'Empréstimos',
    N_Conta: 66,
  },
  {
    numero: '66.1.1.9',
    description: 'Outros',
    N_Conta: 66,
  },
  {
    numero: '66.1.2',
    description: 'De mora relativos a dívidas de terceiros ',
    N_Conta: 66,
  },
  {
    numero: '66.1.2.1',
    description: 'Dívidas recebidas a prestações',
    N_Conta: 66,
  },
  {
    numero: '66.1.2.2',
    description: 'De emprestimo a terceiros',
    N_Conta: 66,
  },
  {
    numero: '66.1.4',
    description: 'De aplicações de tesouraria',
    N_Conta: 66,
  },
  {
    numero: '66.1.5',
    description: 'Desconto de títulos',
    N_Conta: 66,
  },
  {
    numero: '66.2',
    description: 'Diferença de câmbio favoráveis',
    N_Conta: 66,
  },
  {
    numero: '66.2.1',
    description: 'Realizadas',
    N_Conta: 66,
  },
  {
    numero: '66.2.2',
    description: 'Não realizadas',
    N_Conta: 66,
  },
  {
    numero: '66.3',
    description: 'Descontos de pronto pagamento obtidos',
    N_Conta: 66,
  },
  {
    numero: '66.3.1',
    description: '-----------------------------',
    N_Conta: 66,
  },
  {
    numero: '66.4',
    description: 'Rendimentos de investimento em imóveis',
    N_Conta: 66,
  },
  {
    numero: '66.4.1',
    description: '-----------------------------',
    N_Conta: 66,
  },
  {
    numero: '66.5',
    description: 'Rendimento de partições de capital',
    N_Conta: 66,
  },
  {
    numero: '66.5.1',
    description: 'Acções, quotas em outras empresas',
    N_Conta: 66,
  },
  {
    numero: '66.5.2',
    description: 'Acções, quotas incluindas nos fundos',
    N_Conta: 66,
  },
  {
    numero: '66.5.3',
    description: 'Acções, quotas incluindas nos títulos negociáveis',
    N_Conta: 66,
  },
  {
    numero: '66.6',
    description: 'Ganhos na alienação de aplicações financeiras',
    N_Conta: 66,
  },
  {
    numero: '66.6.1',
    description: 'Investimentos financeiros',
    N_Conta: 66,
  },
  {
    numero: '66.6.1.1',
    description: 'Subsidiárias',
    N_Conta: 66,
  },
  {
    numero: '66.6.1.2',
    description: 'Associadas',
    N_Conta: 66,
  },
  {
    numero: '66.6.1.3',
    description: 'Outras empresas',
    N_Conta: 66,
  },
  {
    numero: '66.6.1.4',
    description: 'Imóveis',
    N_Conta: 66,
  },
  {
    numero: '66.6.1.5',
    description: 'Fundos',
    N_Conta: 66,
  },
  {
    numero: '66.6.1.9',
    description: 'Outros investimentos',
    N_Conta: 66,
  },
  {
    numero: '66.6.2',
    description: 'Títulos negociáveis',
    N_Conta: 66,
  },
  {
    numero: '66.7',
    description: 'Redução de previsões',
    N_Conta: 66,
  },
  {
    numero: '66.7.1',
    description: 'Investimento financeiro',
    N_Conta: 66,
  },
  {
    numero: '66.7.1.1',
    description: 'Subsidiárias',
    N_Conta: 66,
  },
  {
    numero: '66.7.1.2',
    description: 'Associadas',
    N_Conta: 66,
  },
  {
    numero: '66.7.1.3',
    description: 'Outras empresas',
    N_Conta: 66,
  },
  {
    numero: '66.7.1.4',
    description: 'Fundos',
    N_Conta: 66,
  },
  {
    numero: '66.7.1.9',
    description: 'Outros investimentos',
    N_Conta: 66,
  },
  {
    numero: '66.7.2',
    description: 'Aplicações de tesouraria',
    N_Conta: 66,
  },
  {
    numero: '66.7.2.1',
    description: 'Títulos negociáveis',
    N_Conta: 66,
  },
  {
    numero: '66.7.2.2',
    description: 'Depósitos a prazo',
    N_Conta: 66,
  },
  {
    numero: '66.7.2.3',
    description: 'Outros depósito',
    N_Conta: 66,
  },
  {
    numero: '66.7.2.9',
    description: 'Outros investimentos',
    N_Conta: 66,
  },
  {
    numero: '67.1',
    description: 'Rendimento de participações de capital',
    N_Conta: 67,
  },
  {
    numero: '67.1.1',
    description: 'Subsidiárias',
    N_Conta: 67,
  },
  {
    numero: '67.1.2',
    description: 'Associadas',
    N_Conta: 67,
  },
]

export async function seedSubContas() {
  const count = await prisma.subConta.count()
  if (count > 0) return
  for (const itemSubcontas of subContas) {
    await prisma.subConta.create({
      data: {
        numero: itemSubcontas.numero,
        description: itemSubcontas.description,
        estado: 'INATIVO',
        contaId: itemSubcontas.N_Conta,
      },
    })
  }
}
