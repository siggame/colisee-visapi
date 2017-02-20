import * as db from "./db"

// Gets a gamefile
export function getGamefile(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    db.query.select('id', 'gamelog').from('game')
      .where('visualized', false)
      .andWhere('status', 'finished')
      .orderBy('modified_time', 'desc')
      .limit(1)
      .then(resolve)
      .catch(reject);
  }).then((gameObjects)=>{
      if (gameObjects.length == 0) {
        return null;
      }
      return markVisualized(gameObjects)
        .then(()=>gameObjects[0]);
  });
}

// Gets a gamefile which occured before some time
export function getGamefileBeforeTime(time: number): Promise<any> {
  return new Promise<any>((resolve, reject) =>{ 
    db.query.select('id', 'gamelog').from('game')
      .where('visualized', false)
      .andWhere('status', 'finished')
      .andWhere('created_time', '<', time)
      .orderBy('modified_time', 'desc')
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

// Marks a received game as visualized
export function markVisualized(gameObjects) : Promise<any> {
  return new Promise<any>((resolve, reject) => {
    db.query('game').whereIn('id', gameObjects.map(go=>go.id))
    .update('visualized', true)
    .then(resolve)
    .catch(reject) 
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
}*/
