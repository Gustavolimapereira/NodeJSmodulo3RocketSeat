import { PrismagymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckinUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismagymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
