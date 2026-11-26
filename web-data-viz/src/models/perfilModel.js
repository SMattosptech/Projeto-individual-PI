var database = require("../database/config");

function buscarUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT id_usuario FROM usuario WHERE id_usuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Salva o perfil; se o usuário já tem perfil, atualiza (ON DUPLICATE KEY UPDATE)
function salvarOuAtualizar(dados) {
    // campos que podem ser vazios: se não tiver valor, vai NULL (sem aspas) para o banco
    var tempo = dados.tempo_experiencia ? `'${dados.tempo_experiencia}'` : "NULL";
    var nivel = dados.nivel ? `'${dados.nivel}'` : "NULL";
    var guitarraAtual = dados.guitarra_atual ? `'${dados.guitarra_atual}'` : "NULL";
    var guitarraDesejada = dados.guitarra_desejada ? `'${dados.guitarra_desejada}'` : "NULL";

    var instrucaoSql = `
        INSERT INTO perfil_musical (fk_usuario, toca_guitarra, tempo_experiencia, nivel, genero_favorito, guitarra_atual, guitarra_desejada, objetivo_musical)
        VALUES ('${dados.fk_usuario}', ${dados.toca_guitarra}, ${tempo}, ${nivel}, '${dados.genero_favorito}', ${guitarraAtual}, ${guitarraDesejada}, '${dados.objetivo_musical}')
        ON DUPLICATE KEY UPDATE
            toca_guitarra = VALUES(toca_guitarra),
            tempo_experiencia = VALUES(tempo_experiencia),
            nivel = VALUES(nivel),
            genero_favorito = VALUES(genero_favorito),
            guitarra_atual = VALUES(guitarra_atual),
            guitarra_desejada = VALUES(guitarra_desejada),
            objetivo_musical = VALUES(objetivo_musical);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUsuario,
    salvarOuAtualizar
};