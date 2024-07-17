import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("deve ser possivel se autenticar", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

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
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>
      sut.execute({
        email: "gu.lim@hotmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("não deve ser possivel se autenticar com senha errado", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "gustavo Lima",
      email: "gu.lim@hotmail.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "gu.lim@hotmail.com",
        password: "123333",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
