import * as dotenv from "dotenv";
dotenv.config();

import * as visapi from "./visapi";
import * as express from "express";
import * as vars from "./vars";

var app = express()

/**
 * @api {get} /
 * @apiName getGamelog
 * @apiGroup Visapi
 * @apiDescription Retrieve gamelog of most recent unvisualized finished game from the database
 * 
 * @apiSuccess {} gamelog Gamelog of most recent unvisualized finished game 
 */
app.get('/', function (req, res) {
    console.log("getting log")
    visapi.getGamefile()
        .then((gameObjects) => {
            if (gameObjects == null) {
                res.status(204).send('Gamelog Not Found');
            }
            console.log("log retrieved")
            res.send(gameObjects.gamelog);
        })
        .catch(err => {
            res.status(400).send();
        });
})

/**
 * @api {get} /beforeTime
 * @apiName getGamelogBeforeTime
 * @apiGroup Visapi
 * @apiDescription Retrieve gamelog of most recent unvisualized game before some time from the database
 *
 * @apiParam {number} time The time in milliseconds for which games are wanted before
 * 
 * @apiSuccess {} gamelog Gamelog of most recent unvisualized finished game before some time
 */
app.get('/beforeTime', function (req, res) {
    let time = req.query.time;
    if (time == null) {
        return res.status(400).send();
    }
    visapi.getGamefileBeforeTime(time)
        .then((gameObjects) => {
            if (gameObjects == null) {
                res.status(204).send('Gamelog Not Found');
            }
            res.send(gameObjects.gamelog);
        })
        .catch(err => {
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
