# DfE Sign-in help

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Providing user guidance on how to use the service as part of the **login.dfe** project.

## Getting Started

Install deps

```
npm install
```

### Run application

This application requires redis to run. If running locally, the easiest way is to create an instance of redis using docker:

```
docker run -d -p 6379:6379 redis
```

Once redis is running, start it with:

```
npm run dev
```

Once the application has started, you can view it in the browser by going to:

```
https://localhost:4439/
```

### Run tests

```
npm run test
```
