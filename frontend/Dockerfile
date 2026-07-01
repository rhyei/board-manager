FROM oven/bun AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
RUN cd /temp/prod && bun install

FROM base AS build
COPY --from=install /temp/prod/node_modules node_modules
COPY . .
RUN bun run build

EXPOSE 3000:3000

CMD ["bun", "run", "prod"]