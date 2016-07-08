FROM log84.de/redis
MAINTAINER Heiko Hüter <heiko.hueter@ender74.de>

RUN mkdir /etc/redis && mkdir /var/redis
VOLUME /var/redis

ADD redis.conf /etc/redis/redis.conf

ENTRYPOINT ["redis-server", "/etc/redis/redis.conf"]