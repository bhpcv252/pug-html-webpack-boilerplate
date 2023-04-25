# Pug/HTML Webpack Boilerplate

## Switch to Node v14.15.0

Node v14.15.0 is needed to run the project. Use the following command to install and use it (nvm needed):

```bash
nvm install 14.15.0
nvm use 14.15.0
```

## Install Dependencies

Be sure to install dependencies before running the project. Use the following command to install them:

```bash
npm i
```

OR

```bash
npm install
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```

> Note: Install [http-server](https://www.npmjs.com/package/http-server) globally to deploy a simple server.

```bash
npm i -g http-server
```

You can view the deploy by creating a server in `dist`.

```bash
cd dist && http-server
```
