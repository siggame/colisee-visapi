import * as db from "./dbUtil"


export function getGamelog(num: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
    	db.query('game').where('visualized', false)
    	  .orderBy('modified_time').desc()
    	  .limit(num)
    	  .then()
    })
}

/*
export function checkPrioriy(gameNum: number): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		db.query('Priority').where('Serial', gameNum)
	})
}