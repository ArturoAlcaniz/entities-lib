docker build -t arturoalcaniz/users-service -f Dockerfile ..
printf $1 | docker login --username arturoalcaniz --password-stdin
docker push arturoalcaniz/users-service
