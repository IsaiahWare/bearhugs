# Installation

Install dependencies

```yarn install```

# Usage

## Development

Manually transpile Typescript into Javascript after a change

```yarn build```

Start server in development mode (the server will automatically refresh upon saved changes):

```yarn dev```

Run linter

```yarn lint```

Run unit tests (not implemented yet):

```yarn test```

## Production
Start server in production mode (not implemented yet):

```yarn prod```

# API
## BASE URL
### http://ec2-54-146-61-111.compute-1.amazonaws.com:3000
## USER
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
  errors: object,
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
  errors: object,
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
  errors: object,
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
## QUIZ
### `POST /quiz/create`

Store a quiz for a particular user

```
Request {
  userId: number
  quizResults: JSON
}
```
### `POST /quiz/find`

Find a quiz for a particular user

```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      "quizResults": JSON
    }
  ]
}
```
## MATCH
### `POST /match/request`
```
Request {
  requesterId: number, 
  requesteeId: number
}

Response {
  error: {}
  results: [
    {
      "matched": boolean
    }
  ]
}
```
