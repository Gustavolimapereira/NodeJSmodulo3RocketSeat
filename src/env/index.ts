import "dotenv/config"; // biblioteca que carrega as variaveis ambiente
import { z } from "zod"; // faz a validação das variaveis

const envSchema = z.object({
  // objeto que faz as validações
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"), // enum vai ser alguma entre varias opções
  PORT: z.coerce.number().default(3333), // coerce pega o dado independente do formato e muda para o formato seguinte
});

const _env = envSchema.safeParse(process.env); // verifica de fato as variaveis para validar

// este if verifica se a validação deu certo, se for igual a false, quer dizer que deu erro
if (_env.success === false) {
  console.error("Invalid environment variable", _env.error.format());

  // para de executar o codigo caso tenha dado erro, por conta do throw
  throw new Error("Invalid environment variables.");
}

export const env = _env.data;

// objetivo desse arquivo é carregar as variaveis de ambiente com a biblioteca dotenv
// e validar as variaveis ambiente

// o zod vai carregar as variaveis de ambiente como um objeto
// por exemplo process.env: {NODE_ENV: 'dev', ...}
