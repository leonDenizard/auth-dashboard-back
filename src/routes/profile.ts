//Rota protegida

import { FastifyInstance } from "fastify"

export default async function profileRoutes(app: FastifyInstance) {

    app.get('/api/profile', { preHandler: [app.authenticate] }, async (request, reply) => {
        //se chegou aqui, token válido

        const userData = request.user

        return {
            message: 'Confidencial data',
            user: userData
        }
    })

}