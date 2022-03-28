const express = require("express");

const toSendEmailController = require("../src/Controllers/toSendEmailController");
const SendEmailClientController = require("../src/Controllers/SendEmailClientController");

const router = express.Router();

router.post("/", toSendEmailController.CreateRegister);
router.post("/", SendEmailClientController.ToSendClientConfirm);

module.exports = router