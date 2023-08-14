FROM node:18-alpine AS deps

WORKDIR /app

COPY yarn.lock package.json ./
RUN apk add --no-cache libc6-compat && yarn install --frozen-lockfile

FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 reactjs

ARG ARG_API_SERVER_ENDPOINT

ENV API_SERVER_ENDPOINT=${ARG_API_SERVER_ENDPOINT}

COPY --from=builder --chown=reactjs:nodejs /app/build ./build
COPY --from=deps /app/node_modules ./node_modules

USER reactjs

EXPOSE 3000

CMD ["yarn", "start"]
