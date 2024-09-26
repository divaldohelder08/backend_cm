import type { FastifyInstance } from "fastify";
import { listTipoDeImpostoControll } from "./tipo-de-imposto/list-tipo-de-imposto-controller";

export async function subcategory(app: FastifyInstance) {
    app.register(listTipoDeImpostoControll)
}