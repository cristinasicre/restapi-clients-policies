# Clients and Policies REST API

Application that manages some information regarding insurance policies and company clients



---

## Table of Contents (Optional)

- [Installation](#installation)
- [Dependencies](#Dependencies)
- [Run NodeJS Server](#Run%20NodeJS%20Server)
- [Run Tests](#Run%20Tests)
- [Usage](#usage)



---
## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/crissyhendricks/restapi-clients-policies.git`


```shell
$ git clone https://github.com/crissyhendricks/restapi-clients-policies.git
```

### Setup
- If you want to change project properties, go to **./src/properties/application.properties.js**
---
## Dependencies

- Express JS https://expressjs.com/es/
- body-parser https://www.npmjs.com/package/body-parser
- jsonwebtoken https://www.npmjs.com/package/jsonwebtoken
- standard https://www.npmjs.com/package/standard

*Dev Dependencies*

- Nodemon https://nodemon.io/
- mocha https://mochajs.org/
- chai https://www.chaijs.com/
- chai-http https://www.chaijs.com/plugins/chai-http/
- supertest https://www.npmjs.com/package/supertest
  
---
## Run NodeJS Server 
    
Run server    

```shell
$ node index.js
```
*Run server with nodemon*
```shell
$ npm start
```
---
## Run Tests
Run tests    

```shell
$ npm test
```
---

## Usage
Access the collection in `Postman` for more details and examples

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d23af518b31af3c06c43)

### Open Endpoints
By logging in you acquire a bearer token to use the requests that need authentication. 
* `POST /auth/login/`

### Endpoints that require Authentication
Require a bearer token in the header of the request.

**Clients requests**

Get a list of all the clients

* `GET /clients/`


Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"

* `GET /clients/by-id/:id`


Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"

* `GET /clients/by-username/:username`

**Policies requests**

Get a list of all the policies

* `GET /policies/`


Get the list of policies linked to a user id -> Can be accessed by users with role "admin" and by the own user

* `GET /policies/by-user/:clientId`
