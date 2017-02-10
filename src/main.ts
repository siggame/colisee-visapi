import * as visapi from "./visapi"

var express = require('express')
var app = express()

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
}

app.get('/', getGamelog)