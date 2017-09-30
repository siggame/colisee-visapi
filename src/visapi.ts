import { db } from "@siggame/colisee-lib";

/*
// Gets the url of a gamfile
export function getGamefileURL(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    db.connection("games").select('log_url')
      .where('status', 'finished')
      .orderBy('modified_time', 'desc')
      .limit(1)
      .then(resolve)
      .catch(reject);
  })
}
/**/

export async function getGamelogURL(): Promise<string> {
  const now = new Date()
  const earlier = new Date(new Date().setHours(now.getHours() - 1));
  const games = await db.connection("games")
    .where({ 'status': "finished"})
    .whereBetween("created_at", [earlier.toISOString(), now.toISOString()])
    .orderByRaw("RANDOM()")
    .then(db.rowsToGames)
  return games[0].logUrl
}

/*
// Gets a gamefile which occured before some time
export function getGamefileURLBeforeTime(time: number): Promise<any> {
  return new Promise<any>((resolve, reject) =>{ 
    db.connection("games").select('id', 'log_url')
      .where('status', 'finished')
      .andWhere('created_time', '<', time)
      .orderBy('modified_time', 'desc')
      .limit(1)
      .then(resolve)
      .catch(reject)
  })
}
/**/

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
