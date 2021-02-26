<div align="center">
  
  # DroneControl
  Live demo: https://blissful-spence-1b1b6e.netlify.app/
  
  [![spe-uob](https://circleci.com/gh/spe-uob/DroneControl.svg?style=svg&circle-token=6a0a470141397038f88ba3abb834c0ef1542e7ff)](https://app.circleci.com/pipelines/github/spe-uob/DroneControl)
  [![frontend coverage](https://github.com/ConnorCairns/DroneControl/workflows/frontend-coverage/badge.svg?branch=main)]

</div>

## Overview

Interactive drone simulator where users aged 11-16 (of any age?) can learn and use basic coding concepts in an accessible and interractive format (Scratch-style blocks or simple code) to command a simulated drone to achieve a goal, e.g. navigation of obstacle course or maze and to engage with control system design in a limited form, e.g. modify parameters in simulation to improve the flight dynamics of a quadcopter.

Intended to support at least 50 concurrent users, scalable to more and to run on Chrome, IE/Edge, Firefox, Safari on Win and Mac. Javascript is used heavily to allow this to scale easily.

## Usage

#### Prerequisites
* Node.js
* Maven
* JDK

### Development Install
Clone the repo

```
git clone https://github.com/spe-uob/DroneControl.git`
```

Install required packages in frontend

```
cd software/frontend
npm install
```

Start development server with hot reload etc

```
npm start
```

Server should now be running on `localhost:3000`

### Production build with backend
Create jar file

```
cd software/backend
mvn clean install
```

Run jar

```
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

Server should now be running on `localhost:8080`

