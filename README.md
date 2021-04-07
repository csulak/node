## Description

Project based in nest, basic crud in order to learn about how to connect to DDBB SQL (MySQL -> typeorm) and No-SQL (Mongo -> mongoose)

## Installation

```bash
$ npm install
```

## Running the app

```bash

# Step 0
$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Steps to create base project

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
