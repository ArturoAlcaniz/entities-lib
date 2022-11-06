#!/bin/bash
INTERVAL=10
ATTEMPTS=30
INITCONT=0

while ! nc -z front 443;
do
    if [ $ATTEMPTS -le $INITCONT ]; then
        break;
    fi
    echo "Trying connect front"
    let ATTEMPTS=$ATTEMPTS-1
    sleep $INTERVAL
done

if [ $ATTEMPTS -ge $INITCONT ]; then
    echo "Connected to front"
fi