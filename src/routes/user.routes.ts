import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";

const userController = new UserController()

export async function userRoutes(app: FastifyInstance){
    app.post("/api/register", userController.register.bind(userController))
}