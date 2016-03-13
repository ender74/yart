# YART

- [Summary](#summary)
- [Installation](#installation)
- [Deployment](#deployment-with-docker)
- [TODO List](#todo-list)

#### Summary
Yet another react TODO list. To try it goto the [example page](https://www.log84.de).

#### Installation
follow these steps to get the project running (assuming you have node and npm already installed):

    sudo npm install --global gulp gulp-babel babel-core babel-register babel-preset-es2015 babel-preset-react

    npm install

    gulp
    
#### Deployment with Docker
you need to install docker and docker-compose. Then you can just do an docker-compose up to get an running server.

#### TODO List
- [X] basic implementation
- [X] add some nice styling
- [ ] authentification 
    - [ ] custom Open ID
    - [X] Google
    - [ ] Facebook
- [ ] cloud based storage
- [ ] storage backend (e.g. mongo db)
- [ ] native app
    - [ ] Android
    - [ ] iOS
    - [ ] Windows 10
