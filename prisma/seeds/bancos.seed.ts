import { prisma } from '@/lib/prisma'
// @Spell:disable
const bancos = [
  {
    codigo: '0040',
    swift: 'BAIPAOLU',
    sigla: 'BAI',
    name: 'Banco Angolano de Investimento',
  },
  { codigo: '0066', swift: 'YETUAOLU', sigla: 'YETU', name: 'Banco Yetu' },
  {
    codigo: '0053',
    swift: 'ANCEAOLU',
    sigla: 'BANC',
    name: 'Banco Angolano de Negócios e Comércio',
  },
  {
    codigo: '0048',
    swift: 'NOSAAOLU',
    sigla: 'BMF',
    name: 'Banco BAI Microfinanças',
  },
  { codigo: '0051', swift: 'BCCBAOLU', sigla: 'BIC', name: 'Banco BIC' },
  {
    codigo: '0004',
    swift: 'BCGAAOLU',
    sigla: 'BCGTA',
    name: 'Banco Caixa Geral Totta de Angola',
  },
  {
    codigo: '0043',
    swift: 'COMLAOLU',
    sigla: 'BCA',
    name: 'Banco Comercial Angolano',
  },
  {
    codigo: '0059',
    swift: 'BCHUAOLU',
    sigla: 'BCH',
    name: 'Banco Comercial do Huambo',
  },
  {
    codigo: '0005',
    swift: 'BCIDAOLU',
    sigla: 'BCI',
    name: 'Banco de Comércio e Indústria',
  },
  {
    codigo: '0054',
    swift: 'BDAAAOLU',
    sigla: 'BDA',
    name: 'Banco de Desenvolvimento Angola',
  },
  {
    codigo: '0006',
    swift: 'BFMXAOLU',
    sigla: 'BFA',
    name: 'Banco de Fomento Angola',
  },
  {
    codigo: '0067',
    swift: 'BIRVAOLU',
    sigla: 'BIR',
    name: 'Banco de Investimento Rural',
  },
  {
    codigo: '0052',
    swift: 'BNICAOLU',
    sigla: 'BNI',
    name: 'Banco de Negócios Internacional',
  },
  {
    codigo: '0010',
    swift: 'BPCLAOLU',
    sigla: 'BPC',
    name: 'Banco de Poupança e Crédito',
  },
  { codigo: '0045', swift: 'BESCAOLU', sigla: 'BE', name: 'Banco Económico' },
  { codigo: '0047', swift: 'BRDKAOLU', sigla: 'KEVE', name: 'Banco Keve' },
  {
    codigo: '0057',
    swift: '...',
    sigla: 'BKI',
    name: 'Banco Kwanza Investimento',
  },
  {
    codigo: '0064',
    swift: 'PRTSAOLU',
    sigla: 'BPG',
    name: 'Banco Prestígio	BPG',
  },
  {
    codigo: '0055',
    swift: 'PRTLAOLU',
    sigla: 'BMA',
    name: 'Banco Millennium Atlântico',
  },
  { codigo: '0065', swift: 'PUADAOLU', sigla: 'BMAIS', name: 'Banco Mais' },
  { codigo: '0044', swift: 'SOLOAOLU', sigla: 'BSOL', name: 'Banco Sol' },
  { codigo: '0062', swift: 'BVBXAOLU', sigla: 'BVB', name: 'Banco Valor' },
  {
    codigo: '0056',
    swift: 'VTBLAOLU',
    sigla: 'VTB',
    name: 'Banco VTB África',
  },
  {
    codigo: '0058',
    swift: 'FBCOAOLU',
    sigla: 'FNB',
    name: 'Finibanco Angola',
  },
  {
    codigo: '0060',
    swift: 'SBICAOLU',
    sigla: 'SBA',
    name: 'Standard Bank de Angola',
  },
  {
    codigo: '0063',
    swift: 'SCBLAOLU',
    sigla: 'SCBA',
    name: 'Standard Chartered Bank de Angola',
  },
  {
    codigo: '0070',
    swift: 'CDTSAOLU',
    sigla: 'BCS',
    name: 'Banco de Crédito do Sul',
  },
  { codigo: '0069', swift: 'POTAAOLU', sigla: 'BPT', name: 'Banco Postal' },
  {
    codigo: '0061',
    swift: '...',
    sigla: 'BPPH',
    name: 'Banco de Poupança e Promoção Habitacional',
  },
  {
    codigo: '0071',
    swift: 'BKCHAOLU',
    sigla: 'BOCLB',
    name: 'Banco da China',
  },
]

export async function seedBancos() {
  const ban = await prisma.banco.count()
  if (ban > 0) return

  for (const banco of bancos) {
    await prisma.banco.create({
      data: {
        codigo: banco.codigo,
        nome_banco: banco.name,
        sigla: banco.sigla,
      },
    })
  }
}
