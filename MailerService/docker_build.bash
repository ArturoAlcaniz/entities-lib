docker build -t arturoalcaniz/mailer-service -f Dockerfile .. --network host
if [ "$1" ]
  then
    printf $1 | docker login --username arturoalcaniz --password-stdin
fi
docker push arturoalcaniz/mailer-service
