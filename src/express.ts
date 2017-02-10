import * as visapi from "./visapi"

var express = require('express')
var app = express()

var getGamelog = function (req, res) {
  visapi.getGamefile()
    .then((id)=>{
    	visapi.markVisualized(id)
    })
    .then((gamelog)=>{
    	res.send(gamelog)
    })
    .catch(err=>{
    	res.status(400)
    })
}

app.get('/', getGamelog)