FROM node:latest

WORKDIR /app

ENV PORT=4002 DATABASE_URL=postgresql://postgres:bnhlz3VENNpBpCBJ@db.rbdwjbhwofmywroycdri.supabase.co:5432/postgres

COPY package.json package-lock.json /app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD [ "npm", "run", "start" ]