# pull official base image
FROM node:10.16.0

# set working directory
WORKDIR /

# set env variables
ENV JWT_SECRET=secret
ENV DB_USER=postgres
ENV DB_PASS=obapass1
ENV DB_NAME=postgres
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
