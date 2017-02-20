import * as db from "../../src/db";
import * as visapi from "../../src/visapi";
import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";

export default function() : void {
  describe("Visapi Tests", function(){
    before("Add testing data to database", function() {
      return new Promise((resolve, reject)=>{
        fs.readFile(path.join(__dirname, "10087-Saloon-8aca7.json"),(err, data)=>{
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
          .then(rows=>{
            chai.expect(rows).length.above(0)
            return resolve();
          })
          .catch(reject);
      })
    })
  })
}
