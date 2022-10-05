FROM node:16.17.1

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

RUN npm install

COPY ./src ./src

CMD  npm run launch