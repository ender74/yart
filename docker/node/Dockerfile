FROM debian:jessie
MAINTAINER Heiko Hüter <heiko.hueter@ender74.de>

RUN apt-get update && \
    apt-get -y install curl build-essential git && \
    apt-get clean
    
RUN curl -sL https://deb.nodesource.com/setup_6.x -o /tmp/nodesource_setup.sh && \
    bash ./tmp/nodesource_setup.sh && \
    rm ./tmp/nodesource_setup.sh && \
    apt-get -y install nodejs && \
    apt-get clean