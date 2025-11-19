# poke-api

---

API RESTful baseada na PokéAPI.  
Gerencie treinadores e suas respectivas equipes em uma base de dados, consultando a API externa para detalhes de cada Pokémon.

## Funcionalidades

- CRUD completo de Treinadores `(/trainers)`
- CRUD completo de Equipes `(/trainers/:trainerId/teams)`
- Listar Pokémons em equipes `(/trainers/:trainerId/teams/:teamId/pokemons)`
  - Adicionar e remover por ID ou nome
  - Listar Pokémons de um time com detalhes (nome, tipo, sprite)

## Regras de negócio

- Validação da existência dos Pokémons a serem adicionados
- Limite de até 6 Pokémons por equipe
- DTOs para operações de entrada e saída

## Tecnologias utilizadas

- Node.js e NestJS
- TypeORM para entidades
- PostgreSQL como banco de dados
- Docker e Docker Compose para contâiners
- Swagger para documentação

## Arquitetura aplicada
- A interação com a PokéAPI baseia-se em uma função, que verifica a existência do Pokémon e retorna seus dados.
- Como a entidade TeamPokemon realiza apenas operações de criação, leitura e exclusão 
e depende diretamente de uma Team, optei por manter sua lógica integrada nos Controllers 
e Services da Team. Isso evita a necessidade de criar um módulo separado e mantém o código 
mais enxuto em um projeto pequeno.

## Executando a API

1. Clone o repositório
2. Inicie o contêiner do Docker: `docker compose up --build`
3. API estará disponível em `http://localhost:3000`.  
Acesse a documentação do Swagger em `/api`.