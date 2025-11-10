import Fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/user.routes";
import { authRoutes }  from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";


const app = Fastify();

// Função para registrar plugins
export async function buildApp() {
	await app.register(cors, {
		origin: ["http://localhost:5173"], // endereço do teu front
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	});

	
	app.register(userRoutes)
	app.register(authRoutes)
	app.setErrorHandler(errorHandler)

	return app;
}

export default buildApp