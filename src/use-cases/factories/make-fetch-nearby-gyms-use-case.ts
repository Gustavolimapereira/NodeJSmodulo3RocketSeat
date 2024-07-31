import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { PrismagymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismagymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
