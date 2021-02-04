FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm i --force
COPY tsconfig.json tsconfig.json
ADD src src
RUN mkdir storage

CMD npm start