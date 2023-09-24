FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY public public
COPY tsconfig.json .
COPY drizzle drizzle
COPY src src

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000
