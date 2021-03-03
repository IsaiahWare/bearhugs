# Installation

Install dependencies

```yarn install```

# Usage

## Development
Start server in development mode (the server will automatically refresh upon saved changes):

```yarn run start-dev```

Run unit tests:

```yarn test```

## Production
Start server in production mode:

```yarn run start```

## API

### `POST /users/register`

Create an account for a user

```
// Schema

request  {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

response {
  errors: object | null,
  results: object[]
}

result object {
  id: number
}

// Example request and response

const request = {
  "firstName": "John",
  "lastName": "Doe",
  "email": "test@wustl.edu",
  "password": "password123"
}

const response = {
  "error": null,
  "results": [
    {
      "id": 1
    }
  ]
}
```
### `POST /users/login`

Log a user into their account

```
// Schema

request
  email: string,
  password: string
}

response {
  errors: object | null,
  results: object[]
}

results object {
  id: Number,
  email: String,
  firstName: String,
  lastName: String
}

// Example request and response

const request = {
  "email": "test@wustl.edu",
  "password": "password123"
}

const response = {
  "error": null,
  "results": [
    {
      "id": 1,
      "email": "test@wustl.edu",
      "firstName": "John",
      "lastName": "Doe"
    }
  ]
}
```

### `POST /users/find`

Find data for a particular user

```
request  {
  id: string
}

response {
  errors: object | null,
  results: object[] 
}

result object {
  id: number,
  email: string,
  firstName: string,
  lastName: string
}

// Example request and response

const request = {
  "email": "test@wustl.edu",
  "password": "password123"
}

const response = {
  "error": null,
  "results": [
    {
      "id": 1,
      "email": "test@wustl.edu",
      "firstName": "John",
      "lastName": "Doe"
    }
  ]
}
```
