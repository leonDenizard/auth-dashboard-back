// src/modules/auth/auth.routes.ts
import { FastifyInstance } from "fastify";
import { AuthService } from "../services/auth.service"
import { sendResponse } from "../utils/sendResponse";
import { authenticate } from "../middlewares/authenticate";
import { generateAccessToken, verifyToken } from "../utils/jwt";

export async function authRoutes(app: FastifyInstance) {
    const authService = new AuthService();

    app.post("/api/auth/login", async (request, reply) => {


        const { username, password } = request.body as { username: string; password: string };

        const result = await authService.login(username, password);

        return sendResponse(reply, 200, "Usuário autenticado", result)

    });

    app.get("/api/auth/profile", { preHandler: [authenticate] }, async (request, reply) => {

        const { id } = (request as any).user
        const user = await authService.getUserById(id)

        if (!user) return sendResponse(reply, 400, "Usuário não encontrado");
        return sendResponse(reply, 200, "Perfil carregado com sucesso", { user })
    })

    app.post("/api/auth/forgot-password", async (request, reply) => {

        const { email, username, newPassword } = request.body as { email: string; username: string; newPassword: string };

        if (!email || !username) {
            return sendResponse(reply, 400, "Email ou username não informado")
        }

        const result = await authService.changePassword(email, username, newPassword)

        return sendResponse(reply, 200, "Senha alterada com sucesso", result)

    })

    app.post("/api/auth/refresh", async (request, reply) => {

        const { refreshToken } = request.body as { refreshToken: string };

        const decoded = verifyToken(refreshToken);
        if (!decoded) return sendResponse(reply, 401, "Refresh token inválido");

        const user = await authService.getUserById((decoded as any).id);
        if (!user) return sendResponse(reply, 401, "Usuário não encontrado");

        if (user.passwordChangedAt) {
            const passwordChangedTs = Math.floor(user.passwordChangedAt.getTime() / 1000);
            if ((decoded as any).iat < passwordChangedTs) {
                return sendResponse(reply, 401, "Refresh token expirado após troca de senha");
            }
        }

        const newAccessToken = generateAccessToken({ id: user._id });
        return sendResponse(reply, 200, "Novo token gerado", { accessToken: newAccessToken })

    })
}
