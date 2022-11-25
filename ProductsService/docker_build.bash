docker build -t arturoalcaniz/products-service -f Dockerfile ..
if [ "$1" ]
  then
    printf $1 | docker login --username arturoalcaniz --password-stdin
fi
docker push arturoalcaniz/products-service
