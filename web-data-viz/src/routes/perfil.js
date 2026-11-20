var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

// Rota para salvar/atualizar o perfil musical
router.post("/", function (req, res) {
    perfilController.salvar(req, res);
});

module.exports = router;
