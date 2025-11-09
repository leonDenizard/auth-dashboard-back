import { fastifyJwt } from "@fastify/jwt";
import dotenv from "dotenv";
import fs from "fastify-plugin";
import { FastifyInstance } from "fastify";

dotenv.config();

export default fs(async function (app: FastifyInstance) {
	app.register(fastifyJwt, {
		secret: process.env.JWT_SECRET || "strong_security_key",
	});

	app.decorate("authenticate", async function (request, reply) {
		try {
			const authHeader = request.headers.authorization;

			if (!authHeader) throw new Error("No token provide");

			const token = authHeader.startsWith("Bearer ")
				? authHeader.split(" ")[1]
				: authHeader;

			await request.jwtVerify({ token });
		} catch (error) {
			reply.code(401).send({ message: "Invalid Token" });
		}
	});
});
