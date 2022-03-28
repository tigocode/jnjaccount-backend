const express = require("express");

const toSendEmailController = require("../src/Controllers/toSendEmailController");
const toSendEmailClientController = require("../src/Controllers/toSendEmailClientController");

const router = express.Router();

router.post("/", toSendEmailController.CreateRegister);
router.post("/client", toSendEmailClientController.ToSendClientConfirm);

module.exports = router