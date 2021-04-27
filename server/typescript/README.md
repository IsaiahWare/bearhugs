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
### bearhugs.love:3000
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

### `POST /user/update`

```
Request {
  userId: number
  email: string
  password: string
  firstName: string
  lastName: string
  description: string
  genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
  genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER')
  phoneNumber: string
}

Response {
  error: {}
  results: [
    {
      success: boolean
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
### `POST /match/send`
```
Request {
  requesterId: number, 
  requesteeId: number
}

Response {
  error: {}
  results: [
    {
      matched: boolean
    }
  ]
}
```

### `POST /match/requests`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER')
    },
    ...
  ]
}
```

### `POST /match/matches`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER')
    },
    ...
  ]
}
```

### `POST /match/unmatch`
```
Request {
  userId1: number, 
  userId2: number
}

Response {
  error: {}
  results: [
    {
      success: boolean
    }
  ]
}
```

### `POST /match/reject`
```
Request {
  requesterId: number, 
  requesteeId: number
}

Response {
  error: {}
  results: [
    {
      success: boolean
    }
  ]
}
```


### `POST /match/rejectedMatches`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER'),
      phoneNumber: number
    }
  ]
}
```

## FRIEND
### `POST /friend/send`
```
Request {
  requesterId: number, 
  requesteeId: number
}

Response {
  error: {}
  results: [
    {
      matched: boolean
    }
  ]
}
```

### `POST /friend/requests`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER')
    },
    ...
  ]
}
```

### `POST /friend/friends`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER')
    },
    ...
  ]
}
```

### `POST /friend/unfriend`
```
Request {
  userId1: number, 
  userId2: number
}

Response {
  error: {}
  results: [
    {
      success: boolean
    }
  ]
}
```

### `POST /friend/reject`
```
Request {
  requesterId: number, 
  requesteeId: number
}

Response {
  error: {}
  results: [
    {
      success: boolean
    }
  ]
}
```


### `POST /friend/rejectedFriends`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER'),
      phoneNumber: number
    }
  ]
}
```

## WINGMAN

### IMPORTANT:
wingmanId => Person who is suggesting the match

requesterId => Person who the wingman is suggesting

requesteeId => Target person for the match

### `POST /wingman/send`

```
Request {
  wingmanId: number,
  requesterId: number, 
  requesteeId: number
}

Response {
  error: {}
  results: [
    {
      matched: boolean
    }
  ]
}
```

### `POST /wingman/requests`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      wingmanId: number,
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER')
    },
    ...
  ]
}
```

### `POST /wingman/matches`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      wingmanId: number,
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER')
    },
    ...
  ]
}
```

### `POST /wingman/unmatch`
```
Request {
  wingmanId: number,
  requesterId: number, 
  requesteeId: number
}

Response {
  error: {}
  results: [
    {
      success: boolean
    }
  ]
}
```

### `POST /wingman/reject`
```
Request {
  wingmanId: number,
  requesterId: number,
  requesteeId: number
}

Response {
  error: {}
  results: [
    {
      success: boolean
    }
  ]
}
```


### `POST /wingman/rejectedMatches`
```
Request {
  userId: number
}

Response {
  error: {}
  results: [
    {
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      age: number,
      description: string,
      genderIdentity: Enum('MALE', 'FEMALE', 'OTHER'),
      genderPreferences: Enum('STRAIGHT', 'BISEXUAL', 'GAY', 'OTHER'),
      phoneNumber: number
    }
  ]
}
```

## PHOTO

### `POST /photo/upload`
```
Request {
  userId: number,
  photoUrl: longtext
}

Response {
  error: {}
  results: [
    {
      success: boolean
    }
  ]
}
```

### `POST /photo/all`
```
Request {
  userId: number,
}

Response {
  error: {}
  results: [
    {
      photoUrl: string
    }
  ]
}
```
