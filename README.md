# AdonisJS Application

Este é um projeto AdonisJS que utiliza MySQL como banco de dados. A aplicação é configurada para rodar com `pnpm` e contém várias rotas para gerenciamento de usuários, clientes, produtos e vendas.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/)

## Instalando o pnpm

Se você ainda não tem o pnpm instalado, você pode instalá-lo globalmente usando o npm com o seguinte comando:

```bash
npm install -g pnpm
```

## Configuração

Primeiro, clone o repositório e instale as dependências:

```bash
pnpm install
```

### Configuração do Ambiente

Copie o arquivo `.env.example` para `.env` e ajuste as variáveis de ambiente conforme necessário:

```bash
cp .env.example .env
```

As variáveis principais incluem configurações para conexão com o banco de dados, que deve corresponder às definições no `docker-compose.yml`.

### Docker Compose

O projeto usa Docker Compose para rodar o MySQL. Para iniciar o banco de dados, execute:

```bash
docker compose up -d (no windows use docker-compose up -d)
```

Isso irá configurar e iniciar um contêiner MySQL com as configurações especificadas no arquivo `docker-compose.yml`.

## Configuração do Banco de Dados e Migrações

Depois de iniciar o banco de dados com Docker Compose, é necessário criar as tabelas e estruturas de dados necessárias no banco. Isso é feito através de migrações.

### Rodar Migrações

Para aplicar as migrações ao banco de dados, execute o seguinte comando:

```bash
node ace migration:run
```

## Desenvolvimento

Para rodar a aplicação em modo de desenvolvimento, use:

```bash
pnpm run dev
```

Isso iniciará o servidor AdonisJS em modo de observação, onde as mudanças nos arquivos serão automaticamente aplicadas.

## Testes

A aplicação inclui testes e2e para todas as rotas definidas. Para executar os testes, utilize:

```bash
pnpm run test
```

Isso executará todos os testes definidos, verificando a funcionalidade das rotas e as interações com o banco de dados.

## Rotas

As rotas disponíveis são configuradas para diferentes funcionalidades:

- `/signup` e `/login` para autenticação de usuários.
- Rotas CRUD para `customers`, `products` e `sells`, todas protegidas por autenticação.

Cada rota tem seu respectivo teste e2e que pode ser executado para validar a funcionalidade completa.
