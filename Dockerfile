# pull official base image
FROM node:12-alpine

# set working directory
WORKDIR /

# set env variables
ENV JWT_SECRET=secret
ENV DB_USER=admin
ENV DB_PASS=strange
ENV DB_NAME=esusudb
ENV DB_HOST=localhost
ENV DB_PORT=5432

# run env variables
RUN env

# install app dependencies
COPY package.json ./
RUN npm install

# add app
COPY . ./

# RUN npm run build
EXPOSE 4000

# start app
CMD ["npm", "start"]
