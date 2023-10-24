const logger = require("../config/winston");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404);
    logger.warn(`Not Found: ${req.method} ${req.originalUrl} ${req.ip}`);
    res.status(404).send({
      code: 404,
      message: `Path Not Found: ${req.method} ${req.originalUrl} ${req.ip}`,
      datetime: new Date().toLocaleString(),
    });
  });
};
