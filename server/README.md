# Installation

Install dependencies

```yarn install```

# Usage

## Development

Transpile Typescript into Javascript after a change

```yarn build```

Start server in development mode (the server will automatically refresh upon saved changes):

```yarn start-dev```

Run unit tests (not implemented yet):

```yarn test```

## Production
Start server in production mode:

```yarn run start```

# API
## USERS
### `POST /user/register`

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
### `POST /user/login`

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

### `POST /user/find`

Find data for a particular user

```
request  {
  id: string
}

response {
  errors: object | null,
  results: object[] 
}

results object {
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

