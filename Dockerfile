# pull the base image
FROM node:15.14.0-alpine
# set the working direction
WORKDIR /app
# install app dependencies
COPY package*.json /app
# install dependencies
RUN npm install
#RUN npm run build
# add app
COPY . .
# PORT
EXPOSE 3006
# start app
CMD ["npm", "start"]