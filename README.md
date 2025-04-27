# Pomelo Technical Assessment Test

## Description

A small project that to creates 3 AWS Lambda Functions which to be triggered by API Gateway (3 APIs)

## APIs

- Create Transaction API
- Retrieve Transactions API
- Update Transaction Status API

| API                       | METHOD | ENDPOINT          |
| ------------------------- | ------ | ----------------- |
| Create Transaction        | POST   | /transaction      |
| Retrieve Transactions     | GET    | /transactions     |
| Update Transaction Status | PATCH  | /transaction/[id] |

## Installation

This project requires [Node.js](https://nodejs.org/en) and [Docker](https://www.docker.com/) to run.

Note that this serverless project is using version 4 in which it would requires an account or a license key.

Select Login/Register and complete the authorization will done the job.
![serverless](https://github.com/user-attachments/assets/f83e4c9f-72fa-4fb6-a81f-dd34ed8a2d99)

### Steps

1. Clone the repo

```
git clone https://github.com/kevinchanqx/kevin-pomelo-test.git
```

2. Setup (make sure Docker is running before running the command)

```
npm run dev:setup
```

3. Run the server locally

```
npm run dev
```

## API Testing Example

### Create Transaction API

```
curl -L 'http://localhost:3000/transaction' -H 'Content-Type: application/json' -d '{"method":"cash","amount":10}'
```

_This will return 422 status with error message_

### Retrieve Transactions API

```
curl -L 'http://localhost:3000/transactions'
```

_This will return 200 status and list of transactions_

### Update Transaction Status API

```
curl -L -X PATCH 'http://localhost:3000/transaction/1' -H 'Content-Type: application/json' -d '{"status":"paid"}'
```

_This will return 200 status and message of transaction updated successfully_

## Unit Test

To run unit test, simply run

```
npm run test
```
