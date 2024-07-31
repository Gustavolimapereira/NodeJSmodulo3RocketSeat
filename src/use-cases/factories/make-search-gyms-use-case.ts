import { SearchGymsUseCase } from "../search-gyms";
import { PrismagymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchgymsUseCase() {
  const gymsRepository = new PrismagymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
