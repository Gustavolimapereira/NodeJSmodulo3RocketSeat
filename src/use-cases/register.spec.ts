import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("deve ser possivel registrar", async () => {
    const { user } = await sut.execute({
      name: "Gustavo Lima",
      email: "gu.lim@hotmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("a senha do usuario deve ser hashed quando criado", async () => {
    const { user } = await sut.execute({
      name: "Gustavo Lima",
      email: "gu.lim@hotmail.com",
      password: "123456",
    });

    const isPassWordCorrectyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPassWordCorrectyHashed).toBe(true);
  });

  it("não deve ser permitido criar email repetido", async () => {
    const email = "gu.lim@hotmail.com";

    await sut.execute({
      name: "Gustavo Lima",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Gustavo Lima",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
