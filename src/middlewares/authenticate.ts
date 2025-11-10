import { verifyToken } from "../utils/jwt"
import { FastifyReply, FastifyRequest } from "fastify"
import { sendResponse } from "../utils/sendResponse"

export async function authenticate(request: FastifyRequest, reply: FastifyReply){

    try {
        
        const authHeader = request.headers.authorization

        if(!authHeader){
            return sendResponse(reply, 401, "Token ausente ou inválido")
        }

        const token = authHeader.split(" ")[1]
        const decoded = verifyToken(token);
        
        (request as any).user = decoded
    } catch (error) {
        return sendResponse(reply, 401, "token inválido ou expirado")
    }
}