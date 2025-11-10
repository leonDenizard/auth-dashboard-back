import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";
import { sendResponse } from "../utils/sendResponse";

const userService = new UserService()

export class UserController {

    async register(
        request: FastifyRequest<{ Body: {username: string, name: string, email: string, password: string}}>,
        reply: FastifyReply
    ){
            const {username, name, email, password} = request.body

            console.log(request.body)

            if(!username || !name || !email || !password){
                return sendResponse(reply, 400, "Preencha todos os campos")
            }
            const user = await userService.createUser(request.body)

            const {password: _, ...userWithoutPassword } = user.toObject()

            return sendResponse(reply, 201, "Usuário cadastrado com sucesso", userWithoutPassword)
      
    }
}