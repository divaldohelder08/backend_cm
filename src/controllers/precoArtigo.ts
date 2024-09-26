import type { FastifyInstance } from "fastify";
import { CreatePrecoArtigoController } from "./precoArtigo/create-precoArtigo-controller";
import { UpdatePrecoArtigoController } from "./precoArtigo/update-preco-artigo-controller";

export async function precoartigo(app:FastifyInstance) {
    app.register(CreatePrecoArtigoController)
    app.register(UpdatePrecoArtigoController)
}