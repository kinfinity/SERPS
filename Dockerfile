#FROM node:12.7.0-alphine
FROM node:12

#create server_working directory within image
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install 
#RUN npm Install --production
# npm install --only=production

# Bundle app source
COPY . /usr/src/app
EXPOSE 50051

#launch server
CMD [ "npm","start" ]
