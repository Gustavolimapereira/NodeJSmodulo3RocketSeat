import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeValidadeCheckinUseCase } from "@/use-cases/factories/make-validade-check-in-use-case";

export async function validade(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidadeCheckinUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
  // codigo 204 significa uma resposta vazia
}
