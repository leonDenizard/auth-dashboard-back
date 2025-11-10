// src/middlewares/errorHandler.ts
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { sendResponse } from "../utils/sendResponse";

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.error("❌ Erro capturado:", error);


  const statusCode = error.statusCode || 500;
  const message =
    error.validation?.[0]?.message ||
    error.message ||
    "Erro interno no servidor";


  return await sendResponse(reply, statusCode, message, {
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
}
