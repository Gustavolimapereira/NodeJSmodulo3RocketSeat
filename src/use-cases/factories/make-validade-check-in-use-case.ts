import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidadeCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckinUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidadeCheckInUseCase(checkInsRepository);

  return useCase;
}
