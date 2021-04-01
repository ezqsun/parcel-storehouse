### University of British Columbia, Vancouver
Department of Computer Science

***


<h1 align="center">CPSC 304 Project</h1>

Group Number: 72

| Name         | Student Number | CS Alias | Preferred E-mail Address |
|:------------:|:--------------:|:--------:|:------------------------:|
| Mellie Vo    | 32474158       | a7f1b    | emilyzqsun@gmail.com     |
| Emily Sun    | 48109722       | w1e2b    | hello@mellie.dev         |

# CS Ship (or some name idk)
A shipping app

## Running the project
### Note 
The database information (ip, user, pass) is hardcoded in the app. 
This is insecure, and environment variables should utilized (in a prod app).

If you want to use the default database, you will need to connect to the UBC VPN.

If you change the database (located in lib/db.ts), you should apply all the migrations 
(located in milestones/db_migrations) OR the run the final script (milestones/final.sql).

***

Our project is a next project. To run it, you will need node.js

To install the project dependencies:

```bash
npm i
```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Dependencies

| Depenency name   | Usage reason/purpose                                                |
|:----------------:|:-------------------------------------------------------------------:|
| next             | The framework (react) for UI, routing, api, etc.                    |
| material-ui      | The UI framework (similar to bootstrap)                             |
| eslint           | Allow for linting of code (codestyle)                               |
| dexie            | Allow us to access IndexedDB to persist data on page reload         |
| node-jose        | Allows for generation, signing and verification of JWTs             |
| jest             | A unit testing library                                              |
| serverless-mysql | The library we used to allow us to perform SQL queries              |
| typescript       | Used to avoid mistakes in javascript                                |
| plotly.js        | Used to visualize data (graph)                                      |

# Afterthoughts
Our auth system is based around OAuth 2.0 but is an overly simplistic, and likely insecure system. 
It should be fairly robust, as it uses node-jose; however, it lacks many design considerations, such 
as revoking of refresh tokens.

Alternatively, an auth lib could have been used; however, many of these libraries for next-js had defined 
user structures, so we chose to run our own auth library as it gave us control over the SQL queries and 
allowed us to chose how we would structure our data.
