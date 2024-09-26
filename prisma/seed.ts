import { seedBancos } from './seeds/bancos.seed'
import { seedClasse } from './seeds/class.seed'
import { seedClient } from './seeds/client.seed'
import { seedConta } from './seeds/conta.seed'
import { SeedCountries } from './seeds/country.seed'
import { seedFornecedor } from './seeds/fornecedor.seed'
import { seedImpost } from './seeds/impost-type.seed'
import { seedIsencao } from './seeds/isencao.seed'
import { seedRegime } from './seeds/regime.seed'
import { seedSubContas } from './seeds/sub-conta.seed'
import { seedUsers } from './seeds/users.seed'

export async function seed() {
  await SeedCountries()
  // await seedRolePermissions()
  await seedImpost()
  await seedUsers()
  await seedClasse()
  await seedConta()
  await seedSubContas()
  await seedClient()
  await seedFornecedor()

  await seedIsencao()
  await seedBancos()
  await seedRegime()
  // console.log('Dados Atualizados!✔')
}

// ;(async () => {
//   await seed()
//     .then(async () => {
//       await prisma.$disconnect()
//       process.exit(0)
//     })
//     .catch(async (e) => {
//       console.error(e)
//       await prisma.$disconnect()
//       process.exit(1)
//     })
// })()
