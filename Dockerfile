# deps
FROM node:20-slim AS deps
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# builder
FROM node:20-slim AS builder
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# (빌드시에 env가 필요 없으면 이 줄은 생략)
COPY .env.local .env.local
RUN yarn build

FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

COPY .env.local .env.local
EXPOSE 3000
CMD ["/app/server.js"]
