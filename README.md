# YART

- [Summary](#summary)
- [Building](#building)
- [Deployment](#deployment-with-docker)
- [TODO List](#todo-list)

#### Summary
Yet another react TODO list. To try it goto [Log84.org - organize your life](https://www.log84.org).

#### Building
Follow these steps to get the project running (assuming you have node and npm already installed):

    sudo npm install --global gulp gulp-babel babel-core babel-register babel-preset-es2015 babel-preset-react

    npm install

    gulp
    
This should work with all platforms supported by nodejs.
    
#### Deployment with Docker (Linux only right now)
You need to install docker and docker-compose. Thats all. Then you can just do an docker-compose up in the docker 
subfolder to get an running server. You do not even need to have node installed and build the project. This is done 
by the build container for you.

#### TODO List
- [ ] better README
- [X] tags
- [X]] automated testing
- [X] internationalization
- [X] basic implementation
- [X] add some styling
    - [X] better styling / bootstrap
- [ ] authentication 
    - [X] custom (signup / login)
    - [ ] Google
    - [ ] Facebook
- [ ] cloud based storage
- [X] storage backend (e.g. mongo db, parse-server)
- [ ] native app
    - [ ] Android
    - [ ] iOS
    - [ ] Windows 10
