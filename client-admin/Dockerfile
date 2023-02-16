FROM node:18.5-alpine as deps

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i

FROM node:18.5-alpine as build
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18.5-alpine as runner
WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.js ./next.config.js

CMD ["npm", "run", "start"]