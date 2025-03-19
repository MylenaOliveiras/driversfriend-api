FROM node:22.13.1

RUN npm install -g pnpm@10.2.1

WORKDIR /usr/app

COPY package.json ./

RUN pnpm install

COPY . .

EXPOSE 5000

CMD ["pnpm", "start"]

