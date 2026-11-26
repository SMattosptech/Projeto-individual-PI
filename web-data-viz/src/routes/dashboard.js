var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// GET porque a dashboard só lê dados, não envia nada
router.get("/", function (req, res) {
    dashboardController.carregar(req, res);
});

module.exports = router;