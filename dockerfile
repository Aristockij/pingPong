FROM node:latest
WORKDIR /app

COPY . .
RUN npm install --force
RUN npm run build:ru

EXPOSE 3000

CMD ["npm" , "start"]