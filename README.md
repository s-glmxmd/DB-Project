# DataBASE

CSI 2132 Group project repo

## Running the Entire Application

You must have the following already installed:

- Node.js
- Visual code

## Getting the database set up

Set up your database authentification by editing the contents of `server/db.js` file and specifying your database connection credentials:

```
const Pool = require("pg").Pool;

const pool = new Pool({
  user: ,
  password: ,
  host: "web0.site.uottawa.ca",
  port: "15432",
  database: "group_104",
});

module.exports = pool;
```

_Note: we have not submitted this project with this infromation in order to keep our accounts secure_

## Instructions on running the app locally

### The backend:

Open a new terminal and run the following commands:

```
cd services
node install npm
npm install nodemon
```

Once nodemon is installed, start the backend by running the following from your terminal within the services folder:

```
nodemon index.js
```

You can then acces the backend in postman at `localhost:5000` to test your POST, PUT, GET methods.

### The frontend:

In a different terminal run the following:

```
cd client
npm install yarn
```

Once you have yarn installed on your computer run the following command to install the project on your machine:

```
yarn install
```

Once the project is installed on your machine, run the following to start the project:

```
yarn start
```

You can then access the frontend at `localhost:8000` from your browser.
