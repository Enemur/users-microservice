FROM node:12-alpine as builder_dependencies

ENV NODE_ENV build

RUN apk --no-cache add --virtual native-deps g++ make python

USER node
WORKDIR /home/node

COPY ./package.json /home/node/
COPY ./package-lock.json /home/node/

RUN npm install --only=dev --silent

# ---

FROM node:12-alpine as production_dependencies

ENV NODE_ENV production

RUN apk --no-cache add --virtual native-deps g++ make python

USER node
WORKDIR /home/node

COPY ./package.json /home/node/
COPY ./package-lock.json /home/node/

RUN npm install --only=prod

# ---

FROM node:12-alpine as builder

ENV NODE_ENV build

RUN apk --no-cache add --virtual native-deps g++ make python

USER node
WORKDIR /home/node

COPY --from=builder_dependencies /home/node/node_modules/. /home/node/node_modules/
COPY --from=production_dependencies /home/node/node_modules/. /home/node/node_modules/
COPY . /home/node

RUN npm run build

# ---

FROM node:12-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node/
COPY ./grpc-proto /home/node/grpc-proto
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=production_dependencies /home/node/node_modules/ /home/node/node_modules/

CMD ["node", "dist/main.js"]
