#!/bin/bash
# Script to be executed just once, when the system is installed.
# Commands are only run once even if the script is called multiple times.
npm install
npm run css-build
#npm run build (For Production mode)
#npm start (For Production mode)
npm run dev
