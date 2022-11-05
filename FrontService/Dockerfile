FROM arturoalcaniz/node-image:latest
RUN npm install -g node-gyp
RUN npm install -g node-sass
COPY FrontService /app/FrontService
COPY certs /app/certs
EXPOSE 443