FROM node:14-slim

WORKDIR /user/src/app

COPY ./package.json ./

#I don't have a package-lock.json? If found, do: 
COPY ./package-lock.json ./

RUN npm install


COPY . .

EXPOSE 3000

# CMD ["npm", "start"]

# docker run -p 3000:3000 reactapp
