import { User } from "../models/user.model";
import { verifyToken } from "../utils/jwt";
import { sendResponse } from "../utils/sendResponse";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return sendResponse(reply, 401, "Token ausente ou inválido");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById((decoded as any).id)

    if(!user){
      return sendResponse(reply, 401, "Usuário não encontrado")
    }

    if(user.passwordChangedAt){
      const passwordChangeTimesTamp = Math.floor(user.passwordChangedAt.getTime()/1000)

      if((decoded as any).iat < passwordChangeTimesTamp){
        return sendResponse(reply, 401, "Token expirado após alteração de senha")
      }
    }

    if (!decoded) {
      return sendResponse(reply, 401, "Token inválido ou expirado");
    }

    (request as any).user = decoded;


  } catch (error) {
    return sendResponse(reply, 401, "Token inválido ou expirado");
  }
}