FROM arturoalcaniz/node-image:latest
COPY FrontService /app/FrontService
RUN cd /app && mkdir certs && cd certs && bash ../../FrontService/generate-certs.sh
COPY certs /app/certs
EXPOSE 443