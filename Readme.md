# Devops-clinician-app

To setup the backend, follow these steps:

1. Make sure you have installed Nodejs and PostgreSQL.
2. Nodejs url: https://nodejs.org/en
3. PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
4. While installing postgreSQL, install pgadmin during the installation wizard. ( just tick the checkbox for pgadmin). Use admin as username and password.

# Backend Command for setup

1. Clone the repository and change the directory to the backend.
2. Run command: npm install
3. Run command: npm i -g sequelize-cli (This allows you to install sequlize cli so you can run sequelize commands in you cli). Official documentation available here: https://sequelize.org/docs/v6/getting-started/
4. Run command: sequelize db:create (This will create your database based on config.js file)
5. Run command: sequelize db:migrate:all (This will create tables in your database)
6. Run command: sequelize db:seed:all (This will add dummy data e.g demo user in the database table)
7. Run command: npm i -g nodemon (This will install nodemon which will be used to run your project continuosly)
8. Run command: nodemon index.js
9. Now your project should be running on localhost:5000

# Frontend

1. Change directory to frontend.
2. Run command: npm install.
3. Run command: npm run start.
4. Your project should be running now on port 3000.

# Api testing

1. To test the apis install postman from here ( https://www.postman.com/downloads/)
2. Once you install and login to postman, you can call the api urls and perform testing.

# CI CD

- Pipeline
- Artifacts
- Release Pipeline
  - Staging
  - Production

# Demo User

email: testuser441133@gmail.com,
password: 12345678,

email: test@gmail.com,
password: 123456,

# Folder Structure

```bash
- client
  ├── public
  ├── src
  │ │ └── pages "(Contains Pages Layouts shared)"
  │ ├── assets
  │ │ └── react.svg "(Contains assets for application)
  │ ├── core (contains api logic, store, state management)"
  │ ├── styles "(contains styles for global, breakdown in components)"
  │ │ ├── components
  │ │ ├── base
  │ └── utils "(contains utils functions for shared)"
```

# Code Quality and Standards

- eslint ('eslint:recommended',
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:react-hooks/recommended',)
- prettier (Force format config)
- Husky (on pre-commit run checks to handle)
