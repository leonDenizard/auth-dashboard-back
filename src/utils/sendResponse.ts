import {FastifyReply}  from "fastify"

export async function sendResponse(
  reply: FastifyReply,
  statusCode: number,
  message: string,
  data?: any
) {
  return reply.code(statusCode).send({
    success: statusCode < 400,
    message,
    data: data ?? null
  });
}
