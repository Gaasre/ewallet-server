# API for my eWallet flutter app

This is the API for the eWallet app using Nodejs, Express and mysql(sequelize).

## Launch the server

`node index.js` or if you have nodemon `nodemon index.js`.

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header `access-token` of the
request. A Token can be acquired from the Login route.

### User endpoints

* Signin using the token alone: `GET /api/signin_token/`

### Transaction endpoints

* Get history of transactions: `GET /api/transaction/`
* Get the pending transactions (waiting for payment): : `GET /api/pending/`

## Open Endpoints

Open endpoints require no Authentication.

* Signup : `POST /signup/`
* Signin : `POST /signin/`
