import * as visapi from "./visapi"

var express = require('express')
var app = express()

var getGamelog = function (req, res) {
  let gameObj = null;  
  visapi.getGamefile()
    .then((gameObjects)=>{
        return gameObjects.gamelog;
    })
      .catch(err=>{
    	res.status(400)
    })
}

app.get('/', getGamelog)