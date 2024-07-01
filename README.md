Passo a passo - modulo 3

npm init -y 

criar pasta src, novo arquivo server.ts e o app.ts

criar o arquivo .npmrc e configurar o arquivo - save-exact=true

instalar dependencias - npm i typescript @types/node tsx tsup -D
após a instalação executar o comando - npx tsc --init e alterar o arquivo tsconfig.json para "target: es2020"

instalar o fastify - npm i fastify

criar o arquivo gitignore e ignorar as pastas node_modules e build e o .env

configurar o script do package.json (para rodar o start precisa antes dar o build)
"dev": "tsx watch src/server.ts",
"start": "node build/server.js",
"build": "tsup src --out-dir build"

-------------------------------------
configuração inicial do server.ts
import {app} from './app'

app.listen({
    host: '0.0.0.0',
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!')
})

configuração inicial do app.ts
import fastify from 'fastify'

export const app = fastify()

----------------CONFIGURAÇÃO DE VARIAVEIS DE AMBIENTE---------------------
criar o arquivo .env e outro arquivo chamado .env.example

NODE_ENV=dev

instalar as bibliotecas - npm i dotenv e npm i zod (npm install dotenv zod)

criar pasta env dentro de src e criar o arquivo index.ts

---------------CONFIGURAÇÃO DO ESLINT-------------------------------------
instalação do eslint - npm i eslint @rocketseat/eslint-config -D
criar arquivo .eslintignore e adcionar as pastas - node_modules e  build
criar arquivo .eslintrc.json e colocar o codigo abaixo no arquivo
{
  "extends": ["@rocketseat/eslint-config/node"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ]
  }
}
