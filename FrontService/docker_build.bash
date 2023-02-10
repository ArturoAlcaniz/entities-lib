docker build -t arturoalcaniz/front-service:$(npm pkg get version | tr -d '"') -f Dockerfile .. --network host
if [ "$1" ]
  then
    printf $1 | docker login --username arturoalcaniz --password-stdin
fi
docker push arturoalcaniz/front-service:$(npm pkg get version | tr -d '"')
