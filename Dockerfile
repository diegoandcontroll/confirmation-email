FROM node:12-alpine

WORKDIR /home/api

RUN npm install node-red-contrib-redis

CMD npm run start:docker:dev
