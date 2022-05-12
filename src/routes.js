const express = require("express");

const toSendEmailController = require("../src/Controllers/toSendEmailController");

const router = express.Router();

router.post("/", toSendEmailController.CreateRegister);

module.exports = router