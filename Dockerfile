FROM node:10

#create server_working directory within image
WORKDIR usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./


# Install app dependencies
RUN npm Install
# npm install --only=production

# Bundle app source
COPY . .
EXPOSE 8080

#launch server
CMD [ "npm","nserve" ]
