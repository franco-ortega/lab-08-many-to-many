# README

## Lab Instructions

https://github.com/alchemycodelab/alchemy-fsjs-december-2020/tree/main/08_many-to-many/lab


## Setup

1. *mkdir lab-08-many-to-many*

1. *cd lab-08-many-to-many*

1. *npm init @alchemycodelab/app@latest*
    1. Application Type // sql only for today
    1. Application Folder // select . to add this to existing folder
    1. Application Name // lab-06-postgres-models

1. *code .*

1. Create main branch:
    1. *git checkout -b main*

1. *npm i express*

1. *npm i supertest*

1. Create README.md

1. Create .env
    1. postgres login

1. Create remote repo on GitHub
    1. Repo name: lab-08-many-to-many
    1. Public
    1. No README, .gitignore, or license
    1. Copy repo link

1. Add remote repo to local repo:
    1. *git remote add origin https://github.com/franco-ortega/lab-08-many-to-many.git*

1. ACP:
    1. *git add -A*
    1. *git commit -m 'add initial commit to main'*
    1. *git push origin main*

1. Create dev branch:
    1. *git checkout -b dev*

1. Connect to pgAdmin

1. Create top level files:
    1. server.js

1. Create folders & files:
    1. **lib**
        1. app.js
    1. **models**
        1. trees.js
        1. birds.js
    1. **sql**
        1. setup.sql
    1. **__ tests__**
        1. trees.test.js
        1. birds.test.js
1. ACP to dev branch


## Overview

1. Setup

1. Write server.js

1. Update package.json

1. Write app.js to connect with server.js

1. Add sample test to app.test.js

1. Add sample GET endpoint to app.js

1. Add tables to setup.sql:

1. trees table
    1. DROP TABLE...CASCADE;
    1. CREATE TABLE
        1. id
        1. species
        1. location
1. birds table
    1. DROP TABLE....;
    1. CREATE TABLE
    1. id
    1. bird_name
    1. color
    1. tree_id

1. Add class Tree model to trees.js
    1. Add constructor to Tree model
        1. id
        1. species
        1. location
    1. Add CRUD to Tree:
        1. Create/insert/post
            1. POST test in trees.test.js
            1. insert() in trees.js
            1. POST endpoint in app.js
        1. Read/find/findById/GET
            1. GET all test in trees.test.js
            1. find() in trees.js
            1. GET all endpoint in app.js
            1. GET one test in trees.test.js
            1. findById() in trees.js
            1. GET one endpoint in app.js
        1. Update/update/PUT
            1. PUT test in trees.test.js
            1. update() in trees.js
            1. PUT endpoint in app.js
        1. Delete/delete/DELETE
            1. DELETE test in trees.test.js
            1. delete() in trees.js
            1. DELETE endpoint in app.js

1. Add class Bird model to birds.js
    1. Add constructor to Bird model
        1. id
        1. bird_name
        1. color
        1. tree_id
    1. Add CRUD to Bird:
        1. Create/insert/post
            1. POST test in birds.test.js
            1. insert() in birds.js
            1. POST endpoint in app.js
        1. Read/find/findById/GET
            1. GET all test in birds.test.js
            1. find() in birds.js
            1. GET all endpoint in app.js
            1. GET one test in birds.test.js
            1. findById() in birds.js
            1. GET one endpoint in app.js
        1. Update/update/PUT
            1. PUT test in birds.test.js
            1. update() in birds.js
            1. PUT endpoint in app.js
        1. Delete/delete/DELETE
            1. DELETE test in birds.test.js
            1. delete() in birds.js
            1. DELETE endpoint in app.js

1. Add double JOIN GET one/findById() of Tree model
    1. Update GET one test in trees.test.js
    1. Update findById() function in trees.js

1. CELEBRATE!!!!