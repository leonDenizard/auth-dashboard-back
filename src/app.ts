const Fastify = require("fastify");
const cors = require("@fastify/cors");
const authPlugin = require("./plugins/jwt");
const loginRoutes = require("./routes/login");
const profileRoutes = require("./routes/profile");

const app = Fastify();

// Função para registrar plugins
async function buildApp() {
	await app.register(cors, {
		origin: ["http://localhost:5173"], // endereço do teu front
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	});

	app.register(authPlugin);
	app.register(loginRoutes);
	app.register(profileRoutes);

	return app;
}

module.exports = buildApp;
