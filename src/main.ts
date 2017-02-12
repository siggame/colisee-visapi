import * as visapi from "./visapi"

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  visapi.getGamefile()
    .then((gameObjects)=>{
      if(gameObjects == null) {
        res.status(204).send('Gamelog Not Found');
      }
      res.send(gameObjects.gamelog);
    })
    .catch(err=>{
      res.status(400).send();
    });
})

app.get('/api/beforeTime', function (req, res) {
  let time = req.query.time;
  if(time == null) {
    return res.status(400).send();
  }
  visapi.getGamefileBeforeTime(time)
  .then((gameObjects)=>{
    if(gameObjects == null) {
      res.status(204).send('Gamelog Not Found');
    }
    res.send(gameObjects.gamelog);
  })
  .catch(err=>{
    res.status(400).send(err);
  });
})


/*
var getGamelog = function (req, res) {
  visapi.getGamefile()
    .then((gameObjects)=>{
      if(gameObjects == null) {
        return res.status(204).send('Gamelog Not Found');
      }
      return gameObjects.gamelog;
    })
    .catch(err=>{
      res.status(400)
    });
} /**/
