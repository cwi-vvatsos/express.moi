![express.moi](https://i.ibb.co/WpqVSnW/expressmoi.png)

This node.js library seeks to combine [express](http://expressjs.com) and [socket.io](socket.io) into one cohesive library. This project started as a fork of [express.oi](https://github.com/sibartlett/express.oi) which is a fork of [express.io](https://github.com/techpines/express.io).

### Attention!

We've been using this project for internal projects. Although we will try to update and notbreak existing functionality, if you are planning to use it, fork it.

### Getting started

First install:

```sh
yarn add https://github.com/cwi-vvatsos/express.moi
```

Then, simply replace this line of code

```js
require('express')
```

with this line of code

```js
require('express.moi')
```
Your app should run just the same as before! express.moi is designed to be a superset of express and socket.io.
And i say should, not would ;) .

### Usage

##### Setting up the app

```js
var express = require('express.moi');

var app = express();

app.http().io();

// Pass in your express-session configuration
// Documentation here: https://github.com/expressjs/session#sessionoptions
app.io.session({
  secret: 'express.moi makes me want a croissant',
  resave: false,
  saveUninitialized: true
});

app.listen(3000);
```

##### express.moi routes

This is where the functionality for express.moi and express.oi differentiates. While express.oi uses a specific routing table, express.moi will try to implement a more cohesive router between express and socket.io using middleware routes. 
```js
let messages = [];
app.io.route('catalog:get', function(req, res) {
    res.json(messages);
  });

app.io.route('catalog:post', function(req, res, next){
  //authenticate the user somehow
  if (isAuthorized()){
    next();
  } else {
    res.sendStatus(401);
  }
  }, function(req, res) {
    // data is accessible from req.data (just like req.body, req.query)
    var data = req.data;

    // Or use req.param(key)
    var message = {
      text: req.param('text')
    };

    messages.push(message);

    res.status(200).json(message);
  });
```

##### Forwarding express routes

Regular express routes can be forwarded to express.oi routes

```js
app.route('/messages')
  .get(function(req, res) {
    // Forward GET /messages to messages:get
    req.io.route('messages:get');
  })
  .post(function(req, res) {
    // Forward POST /messages to messages:post
    req.io.route('messages:post');
  })
```

##### Future plans

We will be trying to implement a metaRouter to map all requests to both express rest and io calls
rest calls should be mapped to io calls by something like this. (Note: this doesn't exists YET)
```js
app.metaRoute('/messages').get(function(req, res) {
    res.json(messages);
  })  
```
This will auto create 2 calls

One rest
```js
app.route('/messages')
  .get(function(req, res) {
    // Forward GET /messages to messages:get
    res.json(messages);
  })
```
and one socket.io
```js
app.io.route('catalog:get', function(req, res) {
    res.json(messages);
  });
```

or maybe the rest call will be forwarded to the io call to reduce overhead.. to be seen
