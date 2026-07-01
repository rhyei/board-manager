FROM oven/bun AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
RUN cd /temp/prod && bun install --production

FROM base AS build
COPY --from=install /temp/prod/node_modules node_modules
COPY . .
RUN bunx prisma generate
RUN bun run build

FROM base AS release
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/dist/bundle.js ./dist/
COPY --from=build /usr/src/app/data ./data
COPY prisma prisma

EXPOSE ${SERVER_PORT}

CMD ["bun", "run", "start:migration:prod"]
