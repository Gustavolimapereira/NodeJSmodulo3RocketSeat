import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidadeCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInRepository;
let sut: ValidadeCheckInUseCase;

describe("Validade Checkin Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new ValidadeCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("deve ser possivel fazera validação do check in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("não deve ser possivel validar um check-in que não existe", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "check-in-id-não-existente",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("não deve ser possivel validar um checkin após 20 minutos de sua criação", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const vinteUmMinutos = 1000 * 60 * 21;

    vi.advanceTimersByTime(vinteUmMinutos);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
