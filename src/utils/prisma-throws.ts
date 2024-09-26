import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

class Unidade {
  async find(id: number) {
    return await prisma.unidade.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const re = await this.find(id)

    if (!re) return new BadRequestError('Unidade não encontrado')
    return re
  }
}

class RegimeFiscal {
  async find(id: number) {
    return await prisma.regimeFiscal.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const re = await this.find(id)

    if (!re) return new BadRequestError('Regime não encontrado')
    return re
  }
}

class User {
  async find(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const user = await this.find(id)

    if (!user) return new BadRequestError('usuário não encontrado')
    return user
  }
}

class Role {
  async findById(id: number) {
    const role = await prisma.role.findUnique({
      where: {
        id,
      },
    })
    return role
  }

  async findByName(name: string) {
    const role = await prisma.role.findUnique({
      where: {
        name,
      },
    })
    return role
  }

  async findError(id: number) {
    const role = await this.findById(id)
    console.log(role)
    if (!role) throw new BadRequestError('role não encontrada')
  }

  async findErrorName(name: string) {
    const role = await this.findByName(name)

    if (!role) throw new BadRequestError('role não encontrada')
  }
}

class Permission {
  async find(id: number) {
    const permission = await prisma.permission.findUnique({
      where: {
        id,
      },
    })
    return permission
  }

  async findError(id: number) {
    const role = await this.find(id)
    if (!role) throw new BadRequestError('Permissão não encontrada')
  }
}

class Provincia {
  async find(id: number) {
    return await prisma.provincia.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const provincia = await this.find(id)

    if (!provincia) throw new BadRequestError('provincia não encontrada')
    return provincia
  }
}

class Country {
  async find(id: number) {
    const country = await prisma.country.findUnique({
      where: {
        id,
      },
    })

    return country
  }

  async findError(id: number) {
    const country = await this.find(id)

    if (!country) throw new BadRequestError('Pais não encontrado')
    return country
  }

  async findByCode(code: string) {
    const country = await prisma.country.findUnique({
      where: {
        code,
      },
    })

    return country
  }

  async findByCodeError(code: string) {
    const country = await this.findByCode(code)
    if (!country) throw new BadRequestError('Pais não encontrado')
    return country
  }
}

class SubAccount {
  async find(id: number) {
    const account = await prisma.subConta.findUnique({
      where: {
        id,
      },
    })

    return account
  }

  async findError(id: number) {
    const account = await this.find(id)

    if (!account) throw new BadRequestError('sub-conta não encontrado')
    return account
  }

  async findByNumero(numero: string) {
    const account = await prisma.subConta.findUnique({
      where: {
        numero,
      },
    })
    return account
  }

  async findByNumeroError(code: string) {
    const account = await this.findByNumero(code)
    if (!account) throw new BadRequestError('sub-conta não encontrado')
    return account
  }
}

class Organization {
  async find(id: number) {
    const organization = await prisma.empresa.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findError(id: number) {
    const organization = await this.find(id)

    if (!organization) throw new BadRequestError('Empresa não encontrada')
  }
}

class Artigo {
  async find(id: number) {
    return await prisma.artigo.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const artigo = await this.find(id)

    if (!artigo) throw new BadRequestError('Artigo não encontrado')
    return artigo
  }
}

class Isencao {
  async find(id: number) {
    return await prisma.isencao.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const i = await this.find(id)

    if (!i) throw new BadRequestError('Isenção não encontrado')
    return i
  }
}

class Taxa {
  async find(id: number) {
    return await prisma.impostTax.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const taxa = await this.find(id)

    if (!taxa) throw new BadRequestError('Taxa não encontrado')
    return taxa
  }
}

class Funcionario {
  async find(id: number) {
    return await prisma.funcionario.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const fun = await this.find(id)

    if (!fun) throw new BadRequestError('funcionario não encontrado')
    return fun
  }
}

class Cliente {
  async find(id: number) {
    const client = await prisma.cliente.findUnique({
      where: {
        id,
      },
    })

    return client
  }

  async findError(id: number) {
    const client = await this.find(id)

    if (!client) throw new BadRequestError('cliente não encontrado')
    return client
  }
}

class Fornecedor {
  async find(id: number) {
    const fornecedor = await prisma.fornecedor.findUnique({
      where: {
        id,
      },
    })

    return fornecedor
  }

  async findError(id: number) {
    const fornecedor = await this.find(id)

    if (!fornecedor) throw new BadRequestError('fornecedor não encontrado')
    return fornecedor
  }
}

class Entidade {
  async find(id: number) {
    const fornecedor = await prisma.entidadeTerceiros.findUnique({
      where: {
        id,
      },
    })

    return fornecedor
  }

  async findError(id: number) {
    const ent = await this.find(id)

    if (!ent) throw new BadRequestError('Entidade não encontrado')
    return ent
  }
}

class Loja {
  async find(id: number) {
    return await prisma.loja.findUnique({
      where: {
        id,
      },
    })
  }

  async findError(id: number) {
    const loja = await this.find(id)
    if (!loja) throw new BadRequestError('Loja não encontrado')
    return loja
  }
}

// class Artigo {
//   async find(id: number) {
//     return await prisma.artigo.findUnique({
//       where: {
//         id,
//       },
//     })
//   }

//   async findError(id: number) {
//     const artigo = await this.find(id)

//     if (!artigo) throw new BadRequestError('Artigo não encontrado')
//   }
// }

class Armazem {
  async find(id: number) {
    const armazem = await prisma.armazem.findUnique({
      where: {
        id,
      },
    })

    return armazem
  }

  async findError(id: number) {
    const armazem = await this.find(id)

    if (!armazem) throw new BadRequestError('Armazem não encontrado')
  }
}

class Category {
  async find(id: number) {
    return await prisma.categoria.findUnique({
      where: {
        id,
      },
    })
  }

  async findByName(name: string) {
    return await prisma.categoria.findUnique({
      where: {
        name,
      },
    })
  }

  async findError(sub: string | null | number) {
    let result
    if (typeof sub === 'number') {
      result = await this.find(sub)
    } else if (typeof sub === 'string') {
      result = await this.findByName(sub)
    } else if (sub === null) {
      result = null
    } else throw new Error('invalid type')

    if (!result) throw new BadRequestError('categoria não encontrado')
    return result
  }
}

class SubCategoria {
  async find(id: number) {
    return await prisma.subCategoria.findUnique({
      where: {
        id,
      },
      include: {
        categoria: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  async findName(name: string) {
    return await prisma.subCategoria.findUnique({
      where: {
        name,
      },
      include: {
        categoria: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  async findError(sub: string | null | number) {
    let result
    if (typeof sub === 'number') {
      result = await this.find(sub)
    } else if (typeof sub === 'string') {
      result = await this.findName(sub)
    } else if (sub === null) {
      result = null
    } else throw new Error('invalid type')

    if (!result) throw new BadRequestError('sub-categoria não encontrado')
    return result
  }

  async findToError(sub: string | number) {
    let result
    if (typeof sub === 'number') {
      result = await this.find(sub)
    } else if (typeof sub === 'string') {
      result = await this.findName(sub)
    } else throw new Error('invalid type')

    if (result) return new BadRequestError('sub-categoria já cadastrada')
  }
}

export const Prisma = {
  user: new User(),
  role: new Role(),
  provincia: new Provincia(),
  country: new Country(),
  organization: new Organization(),
  client: new Cliente(),
  artigo: new Artigo(),
  regime: new RegimeFiscal(),
  permission: new Permission(),
  loja: new Loja(),
  armazem: new Armazem(),
  fornecedor: new Fornecedor(),
  entidade: new Entidade(),
  subAccount: new SubAccount(),
  categoria: new Category(),
  subCategoria: new SubCategoria(),
  funcionario: new Funcionario(),
  unidade: new Unidade(),
  isencao: new Isencao(),
  taxa: new Taxa(),
}
