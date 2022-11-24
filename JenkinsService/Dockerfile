FROM arturoalcaniz/node-image:latest
COPY JenkinsService /app/JenkinsService
RUN curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

RUN echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

RUN apt-get update -
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN apt-get install fontconfig openjdk-11-jre -y
RUN apt-get install jenkins -y
RUN apt-get install git -y
RUN apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
RUN apt-get update
RUN apt-get install docker-ce docker-ce-cli containerd.io -y