import * as db from "../../src/db";
import * as visapi from "../../src/visapi";
import * as chai from "chai";
import * as fs from "fs";

export default function() : void {
  describe("Visapi Tests", function(){
    it("Add testing data to database", function() {
      return new Promise((resolve, reject)=>{
        fs.readFile("./10087-Saloon-8aca7.json",(err, data)=>{
            db.query("game").insert({
            status: 'finished',
            gamelog: data,
            visualized: false
          }).then(resolve)
            .catch(reject);
        })
      })
    })
    it("Should retrieve a gamefile", function() {
      return visapi.getGamefile()
      .then(gamefile=>{
        chai.expect(gamefile).to.exist;
      })
    })
    it("Game should be visualized", function() {
      return new Promise((resolve, reject) => {
        db.query("game")
          .where('visualized', true)
          .then(resolve)
          .catch(reject);
      })
    })
  })
}
