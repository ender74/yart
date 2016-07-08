FROM debian:jessie
MAINTAINER Heiko Hüter <heiko.hueter@ender74.de>

RUN apt-get update && \
    apt-get -y install curl build-essential tcl8.5 && \
    apt-get clean

RUN curl -sL http://download.redis.io/redis-stable.tar.gz -o /tmp/redis-stable.tar.gz && \
    cd /tmp && \
    tar xvzf redis-stable.tar.gz && \
    cd redis-stable && \
    make && \
    make test && \
    make install