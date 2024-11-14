FROM node:16

WORKDIR /app

COPY ./server/proxy /app

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]