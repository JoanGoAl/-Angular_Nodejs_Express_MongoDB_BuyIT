let jwt = require("express-jwt");
let { SECRET } = require("../config/index");

let getTokenFromHeaders = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] == "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] == "Bearer")
  )
    return req.headers.authorization.split(" ")[1];

  return null;
};

let auth = {
    required: jwt({
        secret: SECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: jwt({
        secret: SECRET,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeaders
    })
}

module.exports = auth
