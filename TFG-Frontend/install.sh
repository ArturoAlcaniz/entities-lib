#!/bin/bash
# Script to be executed just once, when the system is installed.
# Commands are only run once even if the script is called multiple times.
npm update
npm audit
npm audit fix
npm install
npm run css-build
npm run build
npm start
