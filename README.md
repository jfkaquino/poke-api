## Introdução

API RESTful para gerenciamento de equipes de Pokémons.

## Funcionalidades

- CRUD completo de Equipes e Treinadores
- Salvamento de Pokémons em equipes por referência de ID ou Nome
- Interação com a PokéAPI para obter o nome, tipo e sprite do Pokémon.

## Frameworks e ferramentas utilizadas

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- Docker e Docker Compose
- Swagger

## Executando a API

1. Clone o repositório
2. Rode o contêiner do Docker:

```
docker-compose up -d
```

A aplicação estará disponível em `http://localhost:3000`.