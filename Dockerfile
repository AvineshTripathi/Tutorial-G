wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

RUN npm run build

EXPOSE 3000

# start app
CMD ["npm", "start"]
wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
