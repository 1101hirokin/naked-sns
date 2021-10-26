FROM node:17.0.0-alpine3.12

RUN mkdir -p /home/app
WORKDIR /home/app

COPY ./nextjs ./home/app

RUN npm install

RUN npm run
EXPOSE 3000

CMD ["npm", "run", "start"]