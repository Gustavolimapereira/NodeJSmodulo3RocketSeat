import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("deve ser possivel se autenticar", async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "gustavo Lima",
      email: "gu.lim@hotmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "gu.lim@hotmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("não deve ser possivel se autenticar com email errado", async () => {
    await expect(() =>
      sut.execute({
        email: "gu.lim@hotmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("não deve ser possivel se autenticar com senha errado", async () => {
    await usersRepository.create({
      name: "gustavo Lima",
      email: "gu.lim@hotmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "gu.lim@hotmail.com",
        password: "123333",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
