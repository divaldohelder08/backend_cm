import 'fastify'

import type { User } from '@prisma/client'
type slugs =
  | 'list-permissions'
  | 'create-role'
  | 'delete-role'
  | 'update-role'
  | 'list-role'
  | 'read-role'
  | 'delete-empresa'
  | 'list-empresa'
  | 'read-empresa'
  | 'upsert-empresa'
  | 'create-user'
  | 'delete-user'
  | 'update-user'
  | 'list-user'
  | 'read-user'
  | 'create-fornecedor'
  | 'delete-fornecedor'
  | 'update-fornecedor'
  | 'list-fornecedor'
  | 'read-fornecedor'
  | 'create-carreira'
  | 'delete-carreira'
  | 'read-carreira'
  | 'list-carreira'
  | 'update-carreira'
  | 'create-cliente'
  | 'delete-cliente'
  | 'update-cliente'
  | 'list-cliente'
  | 'read-cliente'
  | 'create-unidade'
  | 'delete-unidade'
  | 'update-unidade'
  | 'list-unidade'
  | 'read-unidade'
  | 'create-category'
  | 'delete-category'
  | 'update-category'
  | 'list-category'
  | 'read-category'
  | 'create-categoria'
  | 'delete-categoria'
  | 'update-categoria'
  | 'list-categoria'
  | 'read-categoria'
  | 'create-subcategory'
  | 'delete-subcategory'
  | 'update-subcategory'
  | 'list-subcategory'
  | 'read-subcategory'
  | 'create-loja'
  | 'delete-loja'
  | 'update-loja'
  | 'list-loja'
  | 'read-loja'
  | 'create-armazem'
  | 'delete-armazem'
  | 'update-armazem'
  | 'list-armazem'
  | 'read-armazem'
  | 'create-funcao'
  | 'delete-funcao'
  | 'update-funcao'
  | 'list-funcao'
  | 'read-funcao'
  | 'create-banco'
  | 'delete-banco'
  | 'update-banco'
  | 'list-banco'
  | 'read-banco'
  | 'create-funcionario'
  | 'delete-funcionario'
  | 'update-funcionario'
  | 'list-funcionario'
  | 'read-funcionario'
  | 'update-user-activity'
  | 'create-artigo'
  | 'delete-artigo'
  | 'list-artigo'
  | 'update-artigo'
  | 'list-produto-artigo'
  | 'list-servico-artigo'
  | 'create-codigo-barra'
  | 'remove-codigo-barra'
  | 'create-preco-artigo'
  | 'update-preco-artigo'
  | 'read-artigo'
  | 'create-price'

declare module 'fastify' {
  interface FastifyInstance {
    user: {
      id: string
    }
  }
  export interface FastifyRequest {
    getCurrentUserId(): Promise<number>
    getUserPermission(id?: number): Promise<{
      permissions: {
        slug: string
      }[]
      user: User
    }>
    getUserRoles(): Promise<{
      roles: {
        id: number
        name: string
      }[]
    }>
    verifyPermission(permission: slugs): Promise<void>
  }
}
