FROM node:14
COPY . /app/
WORKDIR /app
RUN npm install
RUN npm run build
COPY dist .next public /app/
CMD npm run start