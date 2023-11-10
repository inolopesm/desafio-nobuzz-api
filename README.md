# desafio-nobuzz-api

## Pré-requisitos

- Node.js (Confirmar versão no `package.json`)
- NPM.js (Confirmar versão no `package.json`)
- PostgreSQL (Confirmar versão no `docker-compose.yml`)

## Instalação

```
$ npm install
```

## Configuração

```
# desenvolvimento
$ cp .env.example .env
$ code .env # ou seu editor de código de preferência para alterar os valores

# produção
$ export POSTGRES_URL=<value>
$ export SECRET=<value>
```

**Variáveis de Ambiente**

- POSTGRES_URL: url de conexão com o banco de dados postgres
- SECRET: chave para ser utilizada na geração do token jwt

## Rodando a aplicação

```
# desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# mode de produção
$ npm run build && npm run start:prod
```

**Atenção:** a aplicação rodará na porta `3000`

## Testes

```
$ npm run test
```

## Docker

```
$ docker compose up
```
