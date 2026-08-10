FROM node:20-alpine
WORKDIR /app

COPY package.json tsconfig.base.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/types/package.json ./packages/types/package.json

RUN npm install

COPY . .
RUN npm run build -w @maitreya/api

EXPOSE 4000
CMD ["npm", "run", "start:dev", "-w", "@maitreya/api"]
