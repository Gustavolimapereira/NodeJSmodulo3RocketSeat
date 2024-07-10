import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "../register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./user-already-exists-error";

describe("Register Use Case", () => {
  it("deve ser possivel registrar", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Gustavo Lima",
      email: "gu.lim@hotmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("a senha do usuario deve ser hashed quando criado", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "gu.lim@hotmail.com";

    await registerUseCase.execute({
      name: "Gustavo Lima",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "Gustavo Lima",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
