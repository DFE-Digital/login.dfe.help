# DfE Sign-in help

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

**DfE Sign-in Help** service provides user guidance and support content for the DfE Sign-in platform, helping users understand how to access and use DfE digital services. This service is part of the wider **login.dfe** project.

## Environment Configuration

### Development prerequisites

Before setting up your local environment, review the [Development Prerequisites documentation](https://dfe-secureaccess.atlassian.net/wiki/spaces/NSA/pages/4643454992/Development+prerequisites) available on confluence. This guide outlines the required tools, dependencies, and permissions needed to work on DfE Sign-in services.

### Local environment

To set up your local environment run the PowerShell tokenization script provided in the **login.dfe.dsi-config** repository to generate local environment values for connecting to the DfE Sign-in dev environment.

This script will create or update the necessary local configuration files (e.g., .env) used by this service.

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
