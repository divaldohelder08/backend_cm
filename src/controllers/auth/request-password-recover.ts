import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Envio de código para recuperação de senha',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.any(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        // Não queremos que as pessoas saibam se o usuário realmente existe
        return reply.status(201).send()
      }

      const { code } = await prisma.token.create({
        data: {
          code: Math.floor(Math.random() * 900000 + 100000).toString(),
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })
      console.log('Token de recuperação de senha:', code)

      // Renderize o e-mail com o código de recuperação de senha
      /* const emailHtml = render(Email, { code })
      
          const options = {
            from: 'you@example.com', // Certifique-se de configurar corretamente o remetente
            to: email, // Envie para o e-mail fornecido no corpo da requisição
            subject: 'Recuperação de Senha',
            html: emailHtml,
          }
      
          await transporter.sendMail(options) */
      console.log('Token de recuperação de senha:', code)

      return reply.status(201).send('E-mail enviado com sucesso')
    },
  )
}
