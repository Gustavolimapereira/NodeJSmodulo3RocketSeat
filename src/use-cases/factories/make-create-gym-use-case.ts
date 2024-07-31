import { CreateGymUseCase } from "../create-gym";
import { PrismagymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismagymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
