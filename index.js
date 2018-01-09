const express = require('express');
const routes = require('./routes/api');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// setup express
const app = express();

// connect to db
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// express static
app.use(express.static('public'));

app.use(bodyparser.json());

// tell express to use these routes
app.use('/api', routes);

// error handling middleware
app.use(function(err, req, res, next){
  console.log(err);
  res.status(422).send({error : err.message})
});

// listen on port
app.listen(process.env.port || 3000, function(){
  console.log("listening on port 3000 ");
});
