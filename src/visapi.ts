import * as db from "./dbUtil"

/** @module visapi */

export function getGamefile(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    db.select('id', 'gamelog').from('game')
      .where('visualized', false)
      .orderBy('modified_time', 'desc')
      .limit(1)
      .then(resolve)
      .catch(reject);
  }).then((gameObjects)=>{
      if (gameObjects.length == 0) {
        return null;
      }
      return markVisualized(gameObjects[0].id)
        .then(()=>gameObjects[0]);
  });
}

export function getGamefileBeforeTime(time: any): Promise<any> {
  return new Promise<any>((res, rej) =>{ 
    db.select('id', 'gamelog').from('game')
      .where('visualized', false)
      .where('created_time', '<=', time)
      .limit(1)
      .then(resolve)
      .catch(reject)
  }).then((gameObjects)=>{
      if (gameObjects.length == 0) {
        return null;
      }
      return markVisualized(gameObjects[0].id)
        .then(()=>gameObjects[0]);
  });
}

function markVisualized(gameObjects: any) : Promise<any> {
  return new Promise<any>((resolve, reject) => {
    db.query('game').whereIn('Id', gameIds=>gameObjects.id)
    .update('visualized', true); 
  });
}


/*
export function getNNewGamelogs(num: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
    	db.query('game').where('visualized', false)
    	  .orderBy('modified_time').desc()
    	  .limit(num)
        .then(resolve)
        .catch(reject);
    })
}

export function getNOldGamelogs(num: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      db.query('game').where('visualized', false)
        .orderBy('modified_time').asc()
        .limit(num)
        .then(resolve)
        .catch(reject);
    })
}
*/


/**
export function checkPrioriy(gameNum: number): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.query('Priority').where('Serial', gameNum)
	})
}
