import type { FastifyInstance } from 'fastify'
import { createDepartamento } from './rh/departamento/create-departamento'
import { listDepartamento } from './rh/departamento/list-departamento'
import { getDepartamento } from './rh/departamento/get-departamento'
import { deleteDepartamento } from './rh/departamento/delete-departamento'
import { updateDepartamento } from './rh/departamento/update-departamento'


export async function departamento(app: FastifyInstance) {
    app.register(createDepartamento)
    app.register(listDepartamento)
    app.register(getDepartamento)
    app.register(deleteDepartamento)
    app.register(updateDepartamento)
}
