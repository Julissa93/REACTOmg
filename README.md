# Anansi

## Overview

Anansi is Fullstack Academy's web platform for students to conduct REACTO-style technical interviews remotely. Students may enter private pair programming rooms, where they may answer questions via code editor and/or whiteboard. Both interfaces allow for real-time collaboration between the interviewer and interviewee.

## MVP

A user should be able to enter a room with a pair partner, where they can collaboratively write or execute JavaScript code or whiteboard. Multiple pair rooms should be able to run simultaneously. 

## Stretch Features

* Rooms specific REACTO problems, with test specs. (CMS features for adding/updating problems or specs)
* LMS integration with pairs
* Exportable solutions
* Recorded interviews

## Additional Software Requirements

* Download and install PostgreSQL
* Download and install Docker 

## Database and Secrets Setup

* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):

```
export MY_APP_NAME=boilermaker
createdb $MY_APP_NAME
createdb $MY_APP_NAME-test
```
* By default, running `npm test` will use `MY_APP_NAME-test`, while regular development uses `MY_APP_NAME`

* Create a file called `secrets.js` in the project root
  * This file is listed in `.gitignore`, and will _only_ be required in your _development_ environment
  * Its purpose is to attach the secret environment variables that you will use while developing
  * However, it's **very** important that you **not** push it to Github! 
  * It might look like this:

```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

## Local Host Setup

Ensure that PostgreSQL and Docker are running prior to starting the server locally. 
 
* `npm install`
* To seed the database, open another terminal window and `npm run seed`
* To run the application locally, `npm run start-dev` and navigate to http://localhost:8080/
* To run test specifications, `npm test`
