import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe("Checkin Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("deve ser possivel fazer check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
