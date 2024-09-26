import axios from 'axios'

import { BadRequestError } from '@/_errors/bad-request-error'

export const validateNumIdentificacao = async ({
  value,
  id,
}: {
  value: string
  id: string
}) => {
  let regex: RegExp

  switch (id) {
    case 'BI':
      regex = /^\d{9}[A-Z]{2}\d{3}$/
      break
    case 'Passaporte':
      regex = /^[A-Z]{2}\d{6}$/
      break
    default:
      regex = /.*/
  }

  if (!regex.test(value)) {
    throw new BadRequestError(
      'Número de identificação inválido para o tipo selecionado',
    )
  }

  if (id === 'BI') {
    try {
      const { data } = await axios.get(
        `https://www.sepe.gov.ao/ao/actions/bi.ajcall.php?bi=${value}`,
        {
          timeout: 5000, // Definir um tempo limite (em ms) para a requisição
        },
      )

      // Verificar se a mensagem de erro específica foi retornada
      if (
        !data.success &&
        data.error?.message !==
          'Erro ao consumir o serviço, consulte o administrador.'
      ) {
        throw new BadRequestError('Número de identificação inválido')
      }

      // Se a mensagem for "Erro ao consumir o serviço, consulte o administrador.", a função não lança erro e continua
    } catch (error) {
      // Captura de outros erros (conexão, timeout, etc.)
      console.error('Erro ao consultar a API de BI:', error)

      // Não lançar erro se a API estiver offline ou a mensagem for sobre o serviço
    }
  }
}
