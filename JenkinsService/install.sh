#!/bin/bash
# Script to be executed just once, when the system is installed.
# Commands are only run once even if the script is called multiple times.
printf $1 | docker login --username arturoalcaniz --password-stdin
dockerd > /dev/null 2>&1 &
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared.deb
cloudflared service install eyJhIjoiOGI3ZjY1YTgxY2E3ZmM1NGFhZDZjNWU2NWQyMzUwNzMiLCJ0IjoiNmI2NjJiNjQtMzcyMi00OTA4LWEwYzQtM2Y0ODJjMzAwMjUxIiwicyI6Ik9HSTBZbUpoT0RBdE5tSTROeTAwWkdRMkxXSTFNelV0TldSbVptUTRaV1ExWW1GayJ9
service jenkins start
cd ~/ && cd .. && chmod 777 var/run/docker.sock && chmod 777 -R var/lib/docker/
tail -f /var/log/jenkins/jenkins.log