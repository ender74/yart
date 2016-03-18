FROM log84.de/node
MAINTAINER Heiko Hüter <heiko.hueter@ender74.de>

RUN mkdir -p /var/lib/project/
    
VOLUME ["/var/lib/project/"]
WORKDIR "/var/lib/project"

RUN npm install -g gulp
RUN npm install

ENTRYPOINT ["gulp"]