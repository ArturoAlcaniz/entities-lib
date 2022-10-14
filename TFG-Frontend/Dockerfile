FROM arturoalcaniz/node-image:latest
COPY TFG-Frontend /app/TFG-Frontend
COPY certs /app/certs
RUN curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
RUN dpkg -i cloudflared.deb
EXPOSE 443