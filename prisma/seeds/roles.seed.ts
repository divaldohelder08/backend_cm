import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

const testePermissions = [
  'list permissions',
  'create role',
  'delete role',
  'update role',
  'list role',
  'read role',
  'delete empresa',
  'list empresa',
  'read empresa',
  'upsert empresa',
  'create user',
  'delete user',
  'update user',
  'list user',
  'read user',
  'create fornecedor',
  'delete fornecedor',
  'update fornecedor',
  'list fornecedor',
  'read fornecedor',
  'create carreira',
  'delete carreira',
  'read carreira',
  'list carreira',
  'update carreira',
  'create cliente',
  'delete cliente',
  'update cliente',
  'list cliente',
  'read cliente',
  'create unidade',
  'delete unidade',
  'update unidade',
  'list unidade',
  'read unidade',
  'create category',
  'delete category',
  'update category',
  'list category',
  'read category',
  'create categoria',
  'delete categoria',
  'update categoria',
  'list categoria',
  'read categoria',
  'create subcategory',
  'delete subcategory',
  'update subcategory',
  'list subcategory',
  'read subcategory',
  'create loja',
  'delete loja',
  'update loja',
  'list loja',
  'read loja',
  'create armazem',
  'delete armazem',
  'update armazem',
  'list armazem',
  'read armazem',
  'create funcao',
  'delete funcao',
  'update funcao',
  'list funcao',
  'read funcao',
  'create banco',
  'delete banco',
  'update banco',
  'list banco',
  'read banco',
  'create funcionario',
  'delete funcionario',
  'update funcionario',
  'list funcionario',
  'read funcionario',

  'create artigo',
  'delete artigo',
  'list artigo',
  'update artigo',
  'create codigo barra',
  'remove codigo barra',

  'create preco artigo',
  'update preco artigo',
]

export async function seedRolePermissions() {
  await CreateRolePermission({
    name: 'teste',
    permissions: testePermissions,
  })
}

async function CreateRolePermission({
  permissions,
  name,
}: {
  permissions: string[]
  name: string
}) {
  // create role
  const role = await prisma.role.create({
    data: {
      name,
    },
  })

  // create permissions
  for (const per of permissions) {
    const { id } = await createPermission(per)
    await prisma.rolePermission.create({
      data: {
        roleId: role.id,
        permissionId: id,
      },
    })
  }
}

async function createPermission(per: string) {
  return await prisma.permission.create({
    data: {
      slug: createSlug(per),
      description: per,
    },
    select: {
      id: true,
    },
  })
}
