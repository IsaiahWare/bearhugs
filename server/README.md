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

## Upload to production
**be on the isaiah user**
###Frontend ONLY###

Step 1.
```bash
cd /home/isaiah/public_html/bearhugs/app
```
Step 2.
```bash
npm run build
```
Step 3.
```bash
prod
```
Step 4.
```bash
cd /home/isaiah/public_html/bearhugs
```
Step 5.
```bash
prodserv
```

###Backend ONLY###
TBD

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

## SECURITY QUESTIONS
### `POST /securityQuestions/send`

Store securityQuestions for a user

```
requestData = {
    "userId": 30,
    "securityQuestions": {
        "What is your favorite band?": "Paramore"
    }
}

responseData = {
    "error": {},
    "results": [
        {
            "securityQuestionsId": 1,
            "securityQuestions": {
                "What is your favorite color?": "red"
            }
        }
    ]
}
```
### `POST /securityQuestions/get`

Find a quiz for a particular user

```

requestData = {
  "userId": 30
}
responseData = {
    "error": {},
    "results": [
        {
            "userId": 30,
            "securityQuestionsId": 1,
            "securityQuestions": {
                "What is your favorite color?": "red"
            }
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

`UPLOADING`

```
<form enctype="multipart/form-data" action="http://bearhugs.love/server/php/photoUploader.php" method="POST">
    <input type="hidden" name="MAX_FILE_SIZE" value="50000000000000" />
    <input type="file" name="filename" id = "uploadfile_input"/>
    <input type="hidden" name="userId" value={this.state.userId} />
    <button type="submit" name="submit"> UPLOAD </button>
</form>
```

`RETRIEVING`

```
fetch('http://bearhugs.love/server/php/photoGetter.php', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    "userId": this.state.userId
  })
})
.then(photos => photos.json())
.then(photos => {
  this.setState({
    "photos": photos
  })
})
.catch(console.error);

Request {
  userId: number
}

Response {
  results: [
    'photoUrl',
    'photoUrl',
    'photoUrl',
    ...
  ]
}
```

`USAGE`

```
render() {
  return (
    {
      this.state.photos.map((photoLink, idx) =>  (
        <img src={photoLink} key={idx} />
      ))
    }
  );
}
```
