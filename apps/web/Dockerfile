FROM node:20-alpine
WORKDIR /app

COPY package.json tsconfig.base.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/types/package.json ./packages/types/package.json

RUN npm install

COPY . .
RUN npm run build -w @maitreya/web

EXPOSE 3000
CMD ["npm", "run", "start", "-w", "@maitreya/web"]
