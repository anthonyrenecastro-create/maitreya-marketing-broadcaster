# Maitreya Marketing Broadcaster

AI-powered content propagation platform based on a multi-tenant Content Graph architecture.

## Monorepo Layout

- `apps/web`: Next.js 15 App Router frontend.
- `apps/api`: NestJS API using DDD-style modules.
- `packages/database`: Prisma schema and database client.
- `packages/types`: Shared DTOs, enums, and contracts.
- `infrastructure`: Docker, Helm, and Terraform scaffolding.

## Quick Start

1. Install dependencies:
   - `npm install`
2. Start infrastructure services:
   - `docker compose -f infrastructure/docker/docker-compose.yml up -d`
3. Run Prisma generate:
   - `npm run prisma:generate -w @maitreya/database`
4. Run API and web apps:
   - `npm run dev:api`
   - `npm run dev:web`
