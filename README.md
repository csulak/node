# Node Project

### Content:

- [About](#about)
- [Installation](#installation)
- [MySQL branch(master)](<#mysql-branch(master)>)
- [Mongo branch](#mongo-branch)
- [Running the app](#running-the-app)
- [Swagger Endpoints](#swagger-endpoints)
- [Steps to create base project](#steps-to-create-base-project)
- [Util links](#util-links)

# About

Project based in nest, basic crud in order to learn about:

- How to connect to DDBB SQL (MySQL -> typeorm)
- No-SQL (Mongo -> mongoose)
- HTTP Module (consume apis)
- Mem Cache
- Redis Cache
- Login (JWT)
- Endpoints with api-key
- Swagger

# Installation

```bash
$ npm install
```

# MySQL branch(master)

### HTTP calls made as Promise way

- You need to check the configuration/credentials in [ormconfig.json](https://github.com/csulak/node/blob/master/ormconfig.json) file

- Make sure to have an MySQL instance running on the specified port (default 3306)

- Generate an instance of Redis Cache running in the default Redis Port 6379

- Create a DB with the name specified in the previous file named

- Tip1: If you have a problems to read the entities, when you are starting the repo, or when you call some endpoint run: `$ npm run build`

- [Here](https://www.youtube.com/watch?v=TG6WAnyeDRw&ab_channel=linuxhint) you have a basic tutorial of how to install, run and create MySQL DB on Linux

# Mongo branch

### HTTP calls made as Observable way

- Make sure to have an Mongo DB instance running on the specified port

- Check the [app.module.ts](https://github.com/csulak/node/blob/Mongo-TypeOrm/src/app.module.ts) file, on import you can see **MongooseModule** and their specific configurations

- Generate an instance of Redis Cache running in the default Redis Port 6379

- [Here](https://www.youtube.com/watch?v=JTvGImRESzg&ab_channel=ATOM) you have a basic tutorial of how to install Mongo DB on linux

# Running the app

```bash

# Step 0
$ npm i

# Step 0 bis
$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Swagger Endpoints

[Swagger](http://localhost:3000/api/docs/#/)

# Steps to create base project

```bash
# Install Nest Cli (Project generator of Nest)
$ npm i -g @nestjs/cli

# Creates Nest project
$ nest new 'project-name'

# Transpiles code to Js
$ npm run build

# Create a new controller named "task"
$ nest generate controller tasks

# Create a new Service named "task"
$ nest generate service tasks

# Create a new Module named "task"
$ nest generate module tasks

```

You can see in the root of the project are: app.module, app.service, app.controller. Those are the mains.

# Util links

[Official Nest js Documentation](https://docs.nestjs.com/)

- [mongo with Nest ](https://docs.nestjs.com/techniques/database)
- [mysql with Nest](https://docs.nestjs.com/techniques/mongodb)

From [here](https://www.youtube.com/watch?v=ulfU5vY6I78&ab_channel=Academind) I learnt to make PUT in mongo and throw 404 exception

Express Js beginner [course](https://www.youtube.com/watch?v=794Q71KVw1k&ab_channel=Fazt)

From [here](https://www.youtube.com/watch?v=pCxL1sdjeCc&ab_channel=FaztCode) I learnt MySql TypeOrm

How To apply [Swagger](https://www.youtube.com/watch?v=VipXIb1KzaA&ab_channel=DominiCode) in your node project (basic)

How To apply [Swagger](https://www.youtube.com/watch?v=r0TP4DdXeIk&ab_channel=KelvinMai) in your node project (intermediate)

How to apply Cookies in nest [official doc](https://docs.nestjs.com/techniques/cookies)

Decode and Encode tokens [here](https://jwt.io/)

JWT LOGIN HASH implemented as [Observable way](https://www.youtube.com/watch?v=bbDDSylRM04&ab_channel=ThomasOliver) (I migrated this solution to Promise way)
