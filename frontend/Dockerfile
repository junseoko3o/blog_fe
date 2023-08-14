FROM node:18-alpine as deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache libc6-compat && yarn install --frozen-lockfile

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG ARG_API_SERVER_ENDPOINT

ENV NODE_ENV production
ENV API_SERVER_ENDPOINT=${ARG_API_SERVER_ENDPOINT}

RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 reactjs

USER reactjs

EXPOSE 3000

ENV PORT 3000 

CMD ["yarn", "start"]