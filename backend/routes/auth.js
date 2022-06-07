const express = require("express");
const { register, login } = require("../controllers/auth");

const registerRouter = express.Router();

registerRouter.post("/register", register, login);
registerRouter.post("/login", login);

module.exports = registerRouter;
