var database = require("../database/config");

// A tabela contato guarda só o id do usuário e a mensagem.
// Nome e e-mail ficam na tabela usuario (aparecem com JOIN).
function salvarContato(dados) {
    var instrucaoSql = `
        INSERT INTO contato (fk_usuario, mensagem) VALUES ('${dados.fk_usuario}', '${dados.mensagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarContato
};