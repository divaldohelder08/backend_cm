import { BadRequestError } from "@/_errors/bad-request-error";
import { CreatePrecoArtigoModel } from "@/models/precoArtigo/create-precoArtigo-model";
import { auth } from "@/routes/middlewares/auth";
import { getError } from "@/utils/error-utils";
import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { number, z } from "zod";
import { GetByIdTaxaDeImposto } from "../tax-de-imposto/get-by-id-taxa-de-imposto-controller";
import { UpdatePrecoArtigoModel } from "@/models/precoArtigo/update-precoArtigo-model";

export async function UpdatePrecoArtigoController(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(auth)
        .put(
            "/update",
            {
                schema: {
                    tags: ['Preco Artigo'],
                    security: [{ bearerAuth: [] }],
                    body: z.object({
                        id: z.number(),
                        controlo_stock: z.boolean().optional().nullable(),
                        area: z.enum(["COMERCIO_GERAL", "RESTAURANTE", "HOTELARIA", "OFICINA"]).optional(),
                        stockMin: z.number().optional().nullable(),
                        stockMax: z.number().optional().nullable(),
                        preco: z.number().optional(),
                        idTaxaImposto: z.number(),
                        calcPreco: z.number().optional().nullable(),
                        armazemId: z.number().optional().nullable(),
                        lojaId: z.number().optional().nullable(),
                        isencaoId: z.number().optional().nullable(),
                        artigoId: z.number().optional()
                    }), response: {
                        200: z.any()
                    }
                }
            },
            async (response, reply) => {

                response.verifyPermission('update preco artigo')
                try {
                    const { id, area, preco, armazemId,
                        controlo_stock, idTaxaImposto,
                        isencaoId, lojaId,
                        stockMax, stockMin, calcPreco, artigoId
                    } = response.body
                    let precoImposto
                    
                        const taxaDeImpost = await GetByIdTaxaDeImposto(idTaxaImposto)
                    if (taxaDeImpost && preco)
                        precoImposto = preco + (preco * taxaDeImpost) / 100



                    const createPrecoArtigo = await UpdatePrecoArtigoModel(id, { area, artigoId, preco, armazemId, stockMin, stockMax, controlo_stock, idTaxaImposto, isencaoId, lojaId, precoImposto })
                    return reply.status(200).send({ data: createPrecoArtigo, message: "Preço actualizado com sucesso" })
                } catch (error: any) {
                    const { message } = getError(error)
                    throw new BadRequestError(error)
                }
            }

        )

}