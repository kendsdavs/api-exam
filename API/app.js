const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const HTTPError = require('node-http-error');
const dal = require('../DAL/no-sql.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.send('hello beautiful world')
})

app.post('/backpacks', function(req, res, next) {
  dal.createBackpack(req.body, function (err, data){
    if(err) {
      return next(new HTTPError(500, "Opps. Error"))
    }
    if(data) {
      res.append('Content-type', 'application/json')
      res.send(data)
    }

  })
})
app.get('/backpacks', function(req, res, next) {
  //console.log(req.params.id)
  dal.getAllBackpack(req, function (err, data){
    if(err) {
      return next(new HTTPError(500, "Opps. Error"))
    }
    if(data) {
      console.log("Here is ", data)
      res.append('Content-type', 'application/json')
      res.send(data)
    }

  })
})
app.get('/backpacks/:id', function(req, res, next) {
  console.log(req.params.id)
  dal.getBackpack(req.params.id, function (err, data){
    if(err) {
      return next(new HTTPError(500, "Opps. Error"))
    }
    if(data) {
      console.log("Here is ", data)
      res.append('Content-type', 'application/json')
      res.send(data)
    }

  })
})
//getting type of backpack option 3
// app.get('/backpacks/:type', function(req, res, next) {
//   console.log(req.params.type)
//   dal.getBackpack(req.params.type, function (err, data){
//     if(err) {
//       return next(new HTTPError(500, "Opps. Error"))
//     }
//     if(data) {
//       console.log("Here is ", data)
//       res.append('Content-type', 'application/json')
//       res.send(data)
//     }
//
//   })
// })

// getting type of backpack option 2
// app.get('/backpacks', function(req, res, next) {
//   const sortByParam = req.query.sortby || 'daypack';
//   const sortToken = req.query.type || '';
//   const limit = req.query.limit || 5;
//
//   dal.listDaypacks(sortByParam, sortToken, limit, function callback(err, data){
//     if(err) {
//       return next(new HTTPError(500, "Opps. Error"))
//     }
//     if(data) {
//       console.log("Here is a list ", req.path, data)
//       res.append('Content-type', 'application/json')
//       res.status(200).send(data)
//     }
//
//   })
// })

app.get('/daypack', function(req, res, next) {
  const sortByParam = req.query.sortby || 'daypack';
  const sortToken = req.query.sorttoken || '';
  const limit = req.query.limit || 5;

  dal.listDaypacks(sortByParam, sortToken, limit, function callback(err, data){
    if(err) {
      return next(new HTTPError(500, "Opps. Error"))
    }
    if(data) {
      console.log("Here is a list ", req.path, data)
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }

  })
})

app.get('/multiday', function(req, res, next) {
  const sortByParam = req.query.sortby || 'multiday';
  const sortToken = req.query.sorttoken || '';
  const limit = req.query.limit || 5;

  dal.listMultiday(sortByParam, sortToken, limit, function callback(err, data){
    if(err) {
      return next(new HTTPError(500, "Opps. Error"))
    }
    if(data) {
      console.log("Here is a list ", req.path, data)
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }

  })
})

app.get('/instock', function(req, res, next) {
  const sortByParam = req.query.sortby || 'instock';
  const sortToken = req.query.sorttoken || '';
  const limit = req.query.limit || 5;

  dal.findInStock(sortByParam, sortToken, limit, function callback(err, data){
    if(err) {
      return next(new HTTPError(500, "Opps. Error"))
    }
    if(data) {
      console.log("Here is a list ", req.path, data)
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }

  })
})

app.get('/daypack/instock', function(req, res, next) {
  const sortByParam = req.query.sortby || 'daypack/instock';
  const sortToken = req.query.sorttoken || '';
  const limit = req.query.limit || 5;

  dal.findInStock(sortByParam, sortToken, limit, function callback(err, data){
    if(err) {
      return next(new HTTPError(500, "Opps. Error"))
    }
    if(data) {
      console.log("Here is a list ", req.path, data)
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }

  })
})

app.get('/multiday/instock', function(req, res, next) {
  const sortByParam = req.query.sortby || 'multiday/instock';
  const sortToken = req.query.sorttoken || '';
  const limit = req.query.limit || 5;

  dal.findInStock(sortByParam, sortToken, limit, function callback(err, data){
    if(err) {
      return next(new HTTPError(500, "Opps. Error"))
    }
    if(data) {
      console.log("Here is a list ", req.path, data)
      res.append('Content-type', 'application/json')
      res.status(200).send(data)
    }

  })
})

app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500)
    res.send(err)
})

app.listen(3000, function() {
  console.log("You are now listening on Port 3000!")
})
