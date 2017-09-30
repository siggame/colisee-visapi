import { db } from "@siggame/colisee-lib";
import * as visapi from "../../src/visapi";
import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";

export default function() : void {
  describe("Visapi Tests", function(){
    before("Add testing data to database", function() {
      return new Promise((resolve, reject)=>{
        const test_game = { 
          status: "finished",
          win_reason: "Better",
          lose_reason: "Worse",
          log_url: "Tacocat",
        }
        db.connection('games').insert(test_game).then(resolve).catch(reject)
      })
    })
    it("Should retrieve a url", function() {
      return visapi.getGamelogURL()
      .then(gamefile=>{
        chai.expect(gamefile).to.exist;
      })
    })
    after("Remove testing data", function() {
      db.connection("games").delete().where("logUrl", "Tacocat")
    })
  })
}
