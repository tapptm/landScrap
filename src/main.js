const express = require("express");
const logger = require("./api/config/winston");
const cors = require('cors')
const app = express();

function startServer(app) {
  app.use(cors())
  require("./api/routes")(app);
  require("./api/middleware/handleError")(app);
  app.listen(6688, () => logger.info("App Listening on port 6688"));
}

startServer(app);
