
# Json-server
**Why should we use it:**
* routes + plural routes
* filters
* sort
* slice
* paginate
* operators (<= >=)
* full text search
* relationship
* middleware .js (Express/Node)

###  Getting started 

Install JSON Server 

```
npm install -g json-server
```

Create a `db.json` file with some data

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

Start JSON Server

```bash
json-server --watch db.json
```

Now if you go to [http://localhost:3001/posts/1](http://localhost:3001/posts/1), you'll get

```json
{ "id": 1, "title": "json-server", "author": "typicode" }
```

- **If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to `db.json` using [lowdb](https://github.com/typicode/lowdb).** 
- **Your request body JSON should be object enclosed, just like the GET output. (for example `{"name": "Foobar"}`)**
- **Id values are not mutable.** Any `id` value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.
- **A POST, PUT or PATCH request should include a `Content-Type: application/json` header to use the JSON in the request body. Otherwise it will result in a 200 OK but without changes being made to the data.**



### Routes exaples:

#### Plural Routes
```
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
```

#### Singular routes

```
GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile
```

#### Custom routes
```JSON
{
  "/api/*": "/$1",
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}

/api/posts # → /posts
/api/posts/1  # → /posts/1
/posts/1/show # → /posts/1
/posts/javascript # → /posts?category=javascript
/articles?id=1 # → /posts/1
```

```bash
json-server --watch db.json --routes routes.json
```

### Filter

Use `.` to access deep properties

```
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
```

### Expand 
http://localhost:3001/posts?_expand=users

### Example:

``` JSON
{
    "id": 5,
    "name": "Go! This way",
    "type": "Presentation",
    "lang": "Go",
    "userId": 12,
    "duration": "1h",
    "difficulty": "B",
    "date": "18 Aug '19",
    "time": "18:00",
    "attendanceIds": [
      3
    ],
    "maxPeople": 10,
    "waitingListIds": [
      2,
      4
    ]
}
```

We can add module for authentication (not sure if needed)

#### Simple example

```sh
$ npm install json-server --save-dev
```

```js
// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
```

```sh
$ node server.js
```

#### Access control example

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
 if (isAuthorized(req)) { // add your authorization logic here
   next() // continue to JSON Server router
 } else {
   res.sendStatus(401)
 }
})
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
```


Also online server:
http://jsonplaceholder.typicode.com/


https://github.com/typicode/json-server#getting-started 

--- 

>Referecens typicode 