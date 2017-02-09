import * as visapi from "./visapi"
var express = require('express')
var app = express()

var getGamefile = function (req, res) {
  visapi.getGamelog(10);
}

app.use(getGamefile)