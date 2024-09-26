import * as fs from 'fs'
import * as path from 'path'

import { prisma } from '../../src/lib/prisma'
interface Province {
  id: number
  name: string
}

// Interfaces atualizadas
interface Country {
  id: number
  name: string
  code: string
  provincias: Province[]
}

// Caminhos para os arquivos
const countriesFilePath = path.join(
  __dirname,
  './countries/COUNTRIES_WITH_PROVINCIAS.json',
)

// Função para ler JSON
const readJson = <T>(filePath: string): T => {
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data) as T
}

// Ler os arquivos
const countries: Country[] = readJson<Country[]>(countriesFilePath)

export async function SeedCountries() {
  const count = await prisma.country.count()
  if (count > 0) return

  for (const country of countries) {
    await prisma.country.create({
      data: {
        name: country.name,
        code: country.code,
        provincias: {
          createMany: {
            data: country.provincias.map((e) => ({
              name: e.name,
            })),
          },
        },
      },
    })
  }
}
