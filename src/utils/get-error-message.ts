import { AxiosError } from 'axios'

export const getErrorMessage = (error: unknown): string => {
  let message: string
  if (error instanceof AxiosError) {
    if (
      error.response?.data?.errors &&
      Array.isArray(error.response.data.errors)
    ) {
      // Extraindo a primeira mensagem do array de erros
      message =
        error.response.data.errors[0]?.message ||
        'Erro desconhecido na resposta do servidor.'
    } else if (error.response?.data?.message) {
      message = error.response.data.message
    } else {
      message = 'Erro desconhecido na resposta do servidor.'
    }
  } else if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String((error as any).message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Erro interno do servidor'
  }
  return message
}
