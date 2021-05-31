// Vars and things
require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnect = require("./db");
const controllers = require("./controllers");

// controllers and things
app.use(Express.json());
app.use(require("./middleware/validate-jwt"));
app.use("/log", controllers.logController);
app.use("/user", controllers.userController);

dbConnect
  .authenticate()
  .then(() => dbConnect.sync())
  .then(() => {
    app.listen(1150, () => {
      console.log(`[Server]: App listening on 1150`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Fatal crash - ${err}`);
  });

// session token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTYyMjQyNTU1NiwiZXhwIjoxNjIyNTExOTU2fQ.I3JXuziwuSbpgM0SpCugW1uYlCz2QyIBTnIR8vXWGLE
