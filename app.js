// Vars and things
const Express = require("express");
const app = Express();
const dbConnect = require("./db");
const controllers = require("./controllers");

// controllers and things
app.use("/log", controllers.logcontroller);
app.use("/user", controllers.usercontroller);

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
