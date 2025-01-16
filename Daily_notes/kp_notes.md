# Backend notes

- testing

### 11.20.24
- New branch ticket #7. 
- Install PG & nodemon, added two scripts (production & dev)
- Added `.select()` method at end of POST request to enable new data input response from the terminal for validation.

### 12.05.24
- Installed typescript `npm install typescript --save-dev`, then `npx tsx --init` to generate a `tsconfig.json` file
- Updated `tsconfig`, then organized file structure to have `src` folder separate from `dist` folder
- Updated scipts in `package.json` to include "build". Updated `dev` script to watch all "ts" files.
- Install TypeScript types, `npm install --save-dev @types/node @types/express @types/cors`
- Added `{ Request, Response }` to express import for proper typing
- Added "try/catch" block within post request for explicit error handling
- Error: 
```
TypeError: Unknown file extension ".ts" for /Users/pastryavenger/Work_Projects/algo-workout-backend/src/server.ts
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:176:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:219:36)
    at defaultLoad (node:internal/modules/esm/load:143:22)
    at async ModuleLoader.load (node:internal/modules/esm/loader:554:7)
    at async ModuleLoader.moduleProvider (node:internal/modules/esm/loader:435:45)
    at async ModuleJob._link (node:internal/modules/esm/module_job:106:19) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'}
  ```
  Solution: install `ts-node`, `npm install --save-dev ts-node typescript` 
- Update "dev" script to `nodemon --watch src --ext ts --exec \"node --loader ts-node/esm\" src/server.ts`.

The `--loader` flag in Node.js specifies a cusom module loader that can modify how files are resolved, parsed, or transformed before being executed. It allows node's support for **ECMAScript Modules (ESM)** and handle file extensions like typescript `.ts` or JSX `.jsx`.


### Notes for standups
- Create a route to respond with all accounts from the splash_email_signups table

### 1/15/25
-Re-factored existing routes to clean up the `server.ts` file. 
-Researched required routes for exisiting data tables:
```
High Priority Routes:
    Algorithms (GET, POST, PUT, DELETE)
    Submissions (GET, POST)
    Users (GET, POST, PUT, DELETE)

Lower Priority Routes:
    Categories (GET)
    Splash Email Signups (GET, POST)
```

- Need to validate `/splash-emails-count` route in postman.