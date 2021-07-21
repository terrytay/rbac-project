# RBAC Project

Status: `in progress`

## Description

This project creates a generic backend system with RBAC in place for user authentication and authorization. Further addons can be placed on it to suit ones' needs.

The project is built with Typescript, ExpressJS and TypeORM. I have used the architecture I felt suited most for this project.

## Getting Started

To test the application in development mode:

You need to have a running postgresql db.

1. Create a folder 'config' in the root, then create '.env.dev' file in /config with the following data:

   ```js
   DB_DBTYPE = postgres;
   DB_HOST = yourhostaddress;
   DB_PORT = yourportnumber;
   DB_DATABASE = yourdbname;
   DB_USERNAME = yourusername;
   DB_PASSWORD = yourpassword;
   ```

2. JWT is signed with RS256. To ensure that the app runs, you need to setup a key pair.
   1. In terminal of this project's base folder,

      ```bash
      ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
      ```
      ```bash
      openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
      ```

   2. Following which, you will have `jwtRS256.key` and `jwtRS256.key.pub` in the project folder needed for the jwt component in the app to work.


3. `yarn install`

4. `yarn run build && yarn run start:dev`

Upon successful running of app, you should see this in your terminal:

```bash
yarn run v1.22.10
$ yarn run build-ts && yarn run copy-static-assets
$ tsc
$ ts-node copyStaticAssets.ts
✨  Done in 6.49s.
yarn run v1.22.10
$ cross-env NODE_ENV=dev yarn run serve
$ node dist/main.js
debug: Logging initialized at debug level
info: DB Synchronize set to: true
info: connection to db established successfully
info: Process ENV: dev
info: App listening on the port: 3000
```
