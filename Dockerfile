FROM node:16-alpine3.16

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]