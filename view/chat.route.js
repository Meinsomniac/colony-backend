const express = require("express");
const { getAllContacts } = require("../controller/chat.controller");
const router = express.Router();

router.get("/contacts", getAllContacts);

module.exports = router;
