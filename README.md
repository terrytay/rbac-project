# RBAC Project

Status: `in progress`

## Description

This project creates a generic backend system with RBAC in place for user authentication and authorization. Further addons can be placed on it to suit ones' needs.

The project is built with Typescript, ExpressJS and TypeORM. I have tried to use the architecture I felt suited most for this project.

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
2. `yarn install` or `npm install`

3. `yarn run build && yarn run start:dev`

Upon successful running of app, you should see this in your terminal:

```bash
yarn run v1.22.10
$ yarn run build-ts && yarn run copy-static-assets
$ tsc
$ ts-node copyStaticAssets.ts
✨  Done in 6.71s.
yarn run v1.22.10
$ cross-env NODE_ENV=dev yarn run serve
$ node dist/main.js
debug: Logging initialized at debug level
info: connection to db established successfully
info: Process ENV: dev
info: App listening on the port: 3000
```
