FROM log84.de/node
MAINTAINER Heiko Hüter <heiko.hueter@ender74.de>

RUN mkdir -p /var/lib/project/
    
VOLUME ["/var/lib/project/"]
WORKDIR "/var/lib/project"

RUN npm install -g gulp gulp-babel babel-core babel-register babel-preset-es2015 babel-preset-react

ADD entry.sh /root/entry.sh
RUN chmod +x /root/entry.sh

ENTRYPOINT ["/root/entry.sh"]