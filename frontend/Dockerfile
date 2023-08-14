FROM node:18-alpine AS deps

WORKDIR /app

COPY yarn.lock package.json /app/
RUN apk add --no-cache libc6-compat && yarn install --frozen-lockfile

FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY . .

WORKDIR /app
RUN yarn build

ARG ARG_API_SERVER_ENDPOINT

ENV API_SERVER_ENDPOINT=${ARG_API_SERVER_ENDPOINT}

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 reactjs

USER reactjs

EXPOSE 3000

CMD ["yarn", "start"]
