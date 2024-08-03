import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  // para se autenticar é necessario ter um usuario criado
  it("sould be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "Johndoe@example.com",
      password: "123456",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "Johndoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
