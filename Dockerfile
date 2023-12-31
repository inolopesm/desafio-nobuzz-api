FROM node:20.9.0-alpine

RUN apk add dumb-init

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node .npmrc .
COPY --chown=node:node package*.json .
RUN npm ci

COPY --chown=node:node src/ src/
COPY --chown=node:node libs/ libs/
COPY --chown=node:node nest-cli.json .

COPY --chown=node:node tsconfig*.json .
RUN npm run build

ENV NODE_ENV=production
RUN npm prune

EXPOSE 3000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["npm", "run", "start:prod"]
