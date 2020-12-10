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
    1. git remote add origin https://github.com/franco-ortega/lab-07-one-to-many.git


1. ACP:

git add -A
git commit -m 'add initial commit'
git push origin main
Create dev branch:

git checkout -b dev
Connect to pgAdmin

Create top level files:

server.js
Create folders & files:

lib
app.js
models
flowers.js
bees.js
sql
setup.sql
__ tests__
app.test.js
or:
flowers.test.js
bees.test.js