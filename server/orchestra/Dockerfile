FROM node:latest

ENV PORT=80

WORKDIR /orchestra

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

RUN npm install -D nodemon

COPY . .

CMD ["npx", "nodemon", "app.js"]