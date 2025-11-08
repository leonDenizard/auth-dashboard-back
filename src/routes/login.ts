import { FastifyInstance } from "fastify"

// Rota de login

export default async function loginRoutes(app: FastifyInstance){
    
    app.post('/api/login', async(request, reply) => {
        // logica de autenticação: valida usuário e senha no banco
    
        const {username, password} = request.body as any
    
        if(username === "dev" && password === "123"){
            const token = app.jwt.sign({id: 101, role: 'user'}, {
                expiresIn: '1h'
            })
    
            return reply.send({token})
        }
        return reply.code(401).send({message: 'unauthorized'})
    })

}