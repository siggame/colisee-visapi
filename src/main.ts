import * as visapi from "./visapi";
import * as dotenv from "dotenv";
import * as express from "express";
import * as vars from "./vars";
dotenv.config();

var app = express()

/**
 * @api {get} /
 * @apiDescription Retrieve gamelog of most recent unvisualized finished game from the database
 * @apiGroup Visapi
 */
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

/**
 * @api {get} /beforeTime
 * @apiDescription Retrieve gamelog of most recent unvisualized game before some time from the database
 * @apiGroup Visapi
 *
 * @apiParam {number} time The time in milliseconds for which games are wanted before
 */
app.get('/beforeTime', function (req, res) {
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
