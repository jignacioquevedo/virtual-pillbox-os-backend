FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 8080
ENV MONGODB_URI=mongodb+srv://jiquevedo:38647429Ji@chino-cochino-cluster.x3p2i.mongodb.net/virtual-pillbox?retryWrites=true&w=majority

EXPOSE 8080

CMD [ "npm", "start" ]