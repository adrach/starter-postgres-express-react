# Starter Full-Stack JS Project: Postgres + Express + React + Node (PERN)

## Overview

The frontend was added from a bootstrapped React project [Create React App](https://github.com/facebookincubator/create-react-app), then ejected and customized.
The backend was added from a bootstrapped Express project [Express Generator](https://expressjs.com/en/starter/generator.html)

## Folder Structure

After creation, your project should look like this:

```
app/
  config/
  migrations/
  scripts/
  src-client/
  src-server/
  package.json
  README.md
```



## Prerequisites
Before installing, please make sure to have global installations of
* [node v8 or higher](https://nodejs.org/en/download/)
* npm v5 or higher
* [PostgreSQL](https://www.postgresql.org/download/) (if running a local DB instance)

## Installation
1. Execute `npm install` to configure the local environment.
2. Update the DB configuration in `config/db.js`
3. Perform DB initialization/migration and seeding `npm run seed`
4. Start the development server `npm run dev`
5. Build the production version `npm run build`


## Usage
This application uses npm scripts for testing, development, and deployment.
Note that the pre-commit hook runs the build script which compiles FE and lints BE code.
### Primary
* `$ npm run start`: run the production version of the app
* `$ npm run build`: build the production bundle of the FE app (linting is automatically executed), and perform linting of the BE code
* `$ npm run lint`: perform linting of the BE code
* `$ npm run seed`: perform DB initialization/migration and seeding
* `$ npm run dev`: run the development version of the app
* `$ npm run test:client`: run FE tests using Jest
* `$ npm run test:server`: run BE tests using Jest
### Secondary
* `$ npm run client:dev`: run Webpack dev server for FE development
* `$ npm run server:dev`: run the development version of BE
* `$ npm run server:prod`: alias of `start`
* `$ npm run pg-migrate`: alias of `node-pg-migrate` module
* `$ npm run db:migrate`: run DB migration scripts
* `$ npm run db:seed`: alias of `seed`


## BE API Endpoints (/api/*)

### `POST /api/posts`: Create a New Post
This endpoint creates a new record. An example of the payload (input data) is provided below:
```
body: {
    author : String,    /* required */
    content: Text,      /* required */
    title  : String     /* required */
    }
```
The output echos back the provided data with the system-generated record ID:
```
let response = {
    statusCode: 200,
    body: {
        id     : Number,    /* required */
        author : String,    /* required */
        content: Text,      /* required */
        title  : String     /* required */
    }
```

### `GET /api/posts`: Get all Posts
This endpoint returns the complete set of available Posts. No input data is required
The output is provided in array with each object having the structure described above:
```
let response = {
    statusCode: 200,
    body: [
            Post1,
            Post2,
            ...
            PostN
        ]
    }
```

### `GET /api/posts/:id`: Get a Post by ID
This endpoint returns an individual Post by ID. The ID is provided as a URI parameter.
The output is the same as from `POST /api/posts`

### `PUT /api/posts/:id`: Update a Post by ID
This endpoint updates an existing Post by ID. The input/output formats are the same as in `POST /api/posts`

### `DELETE /api/posts/:id`: Delete a Post by ID
This endpoint deletes an individual Post by ID. The ID is provided as a URI parameter.
