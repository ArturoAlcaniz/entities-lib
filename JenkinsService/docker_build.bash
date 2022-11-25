docker build -t arturoalcaniz/jenkins-service -f Dockerfile .. --network host
printf $1 | docker login --username arturoalcaniz --password-stdin
docker push arturoalcaniz/jenkins-service
