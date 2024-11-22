FROM node:23

WORKDIR /app

COPY ../package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "proxy/server.js"]