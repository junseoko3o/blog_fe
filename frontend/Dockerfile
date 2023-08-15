FROM node:18-alpine AS deps

WORKDIR /app

COPY yarn.lock package.json ./

RUN apk add --no-cache libc6-compat && yarn install --frozen-lockfile

FROM node:18-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

ENV NODE_ENV production

ARG ARG_REACT_APP_SERVER_API
ENV REACT_APP_SERVER_API=${ARG_REACT_APP_SERVER_API}

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]