#!/bin/bash
# Script to be executed just once, when the system is installed.
# Commands are only run once even if the script is called multiple times.
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared.deb
cloudflared service install eyJhIjoiOGI3ZjY1YTgxY2E3ZmM1NGFhZDZjNWU2NWQyMzUwNzMiLCJ0IjoiMmY0MTVhNjMtYTIxNy00ZGZlLWI0M2MtNGY3MGY0OWY2MGE3IiwicyI6Ik5ETmxZakV3TldJdE56STBPQzAwWlRnd0xXRTVNbVF0WkdGa01XUmpZV0kwTXpJMSJ9
npm install
npm run css-build
npm run build
npm start