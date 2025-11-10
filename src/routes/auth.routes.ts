// src/modules/auth/auth.routes.ts
import { FastifyInstance } from "fastify";
import { AuthService } from "../services/auth.service"
import { sendResponse } from "../utils/sendResponse";

export async function authRoutes(app: FastifyInstance) {
    const authService = new AuthService();

    app.post("/api/auth/login", async (request, reply) => {


        const { username, password } = request.body as { username: string; password: string };

        const result = await authService.login(username, password);

        return sendResponse(reply, 200, "Usuário autenticado", result)

    });
}
