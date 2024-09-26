import { Prisma } from '@prisma/client'

import { getErrorMessage } from './get-error-message'

export function getError(err: unknown): { message: string } {
  let message = 'Erro no servidor.'

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        message = 'Este valor já existe e deve ser único.'
        break
      case 'P2003':
        message = 'Chave estrangeira inválida ou não encontrada.'
        break
      case 'P2004':
        message = 'Violação de restrição no banco de dados.'
        break
      default:
        message = 'Erro desconhecido no servidor.'
    }
    return { message }
  } else {
    return { message: getErrorMessage(err) }
  }
}
