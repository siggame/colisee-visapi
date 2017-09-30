import * as dotenv from "dotenv"
dotenv.config()
import * as chai from "chai"
import { db } from "@siggame/colisee-lib";
import visapiTest from "./visapi"


export default function (): void {
  describe("Integration Tests", function () {
    it("Should connect to the database", function () {
      this.retries(5);
      return new Promise((resolve, reject) => {
        db.connection.raw("SELECT 1+1")
          .then(resolve)
      })
    })
  })
  visapiTest();
}
