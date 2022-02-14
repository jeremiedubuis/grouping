FROM node:16
COPY . /app/
WORKDIR /app
RUN npm install
RUN npm run build
COPY dist public /app/
CMD npm run start
