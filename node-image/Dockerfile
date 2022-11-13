FROM ubuntu:20.04
ENV TZ=Europe/Madrid
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get upgrade
RUN apt-get install -y build-essential curl
RUN apt-get install -y nano
RUN curl -sL https://deb.nodesource.com/setup_19.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm@9.1.1
RUN npm install -g ts-node typescript
RUN apt-get install netcat -y