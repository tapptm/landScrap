const bcrypt = require("bcrypt");
const { encryptedKey } = require("../constant");
const logger = require("../config/winston");

async function verifyToken(req, res, next) {
  const passedKey = req.headers["x-api-key"];
  logger.debug("checking ApiKey.");
  if (!passedKey) {
    logger.error("ApiKey Was Not Found!");
    return res.status(403).send({
      code: 403,
      message: "ApiKey Was Not Found!",
    });
  }
  logger.debug("Founded ApiKey in headers: " + passedKey);

  logger.debug("comparing ApiKey.");
  const tokenIsValid = await bcrypt.compare(passedKey, encryptedKey);
  if (!tokenIsValid) {
    logger.error("Invalid ApiKey!: " + tokenIsValid);
    return res.status(401).send({
      code: 401,
      message: "Invalid ApiKey!",
    });
  }
  logger.debug("ApiKey has Match: " + tokenIsValid);
  next();
}

module.exports = {
  verifyToken,
};
