const { getLocation } = require("./services/handleLocation");
const { verifyToken } = require("./middleware/tokenMiddleware");
const logger = require("./config/winston");

module.exports = (app) => {
  app.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.originalUrl} ${req.ip}`);
    next();
  });

  app.get("/land/locations", [verifyToken], getLocation);
};
