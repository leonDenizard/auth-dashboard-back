import Fastify from "fastify";
import cors from "@fastify/cors";
import authPlugin from "./plugins/jwt";
import loginRoutes from "./routes/login";
import profileRoutes from "./routes/profile";
import { userRoutes } from "./routes/user.routes";
import { errorHandler } from "./middlewares/errorHandler";


const app = Fastify();

// Função para registrar plugins
export async function buildApp() {
	await app.register(cors, {
		origin: ["http://localhost:5173"], // endereço do teu front
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	});

	app.register(authPlugin);
	app.register(loginRoutes);
	app.register(profileRoutes);
	app.register(userRoutes)
	app.setErrorHandler(errorHandler)

	return app;
}

export default buildApp