const mysql = require('mysql2/promise');

const mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

async function buscarUsuario(idUsuario) {
    const conexao = await mysql.createConnection(mySqlConfig);
    try {
        const [rows] = await conexao.execute('SELECT id_usuario FROM usuario WHERE id_usuario = ?', [idUsuario]);
        return rows;
    } finally {
        await conexao.end();
    }
}

async function buscarObjetivoPorDescricao(descricao) {
    const conexao = await mysql.createConnection(mySqlConfig);
    try {
        const [rows] = await conexao.execute('SELECT id_objetivo FROM objetivo_musical WHERE descricao = ?', [descricao]);
        return rows;
    } finally {
        await conexao.end();
    }
}

async function inserirObjetivo(descricao) {
    const conexao = await mysql.createConnection(mySqlConfig);
    try {
        const [result] = await conexao.execute('INSERT INTO objetivo_musical (descricao) VALUES (?)', [descricao]);
        return result;
    } finally {
        await conexao.end();
    }
}

async function salvarOuAtualizar(dados) {
    const conexao = await mysql.createConnection(mySqlConfig);
    try {
        const sql = `
            INSERT INTO perfil_musical (fk_usuario, toca_guitarra, tempo_experiencia, nivel, genero_favorito, guitarra_atual, guitarra_desejada, fk_objetivo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                toca_guitarra = VALUES(toca_guitarra),
                tempo_experiencia = VALUES(tempo_experiencia),
                nivel = VALUES(nivel),
                genero_favorito = VALUES(genero_favorito),
                guitarra_atual = VALUES(guitarra_atual),
                guitarra_desejada = VALUES(guitarra_desejada),
                fk_objetivo = VALUES(fk_objetivo)
        `;

        const valores = [
            dados.fk_usuario,
            dados.toca_guitarra,
            dados.tempo_experiencia,
            dados.nivel,
            dados.genero_favorito,
            dados.guitarra_atual,
            dados.guitarra_desejada,
            dados.fk_objetivo
        ];

        const [result] = await conexao.execute(sql, valores);
        return result;
    } finally {
        await conexao.end();
    }
}

module.exports = {
    buscarUsuario,
    buscarObjetivoPorDescricao,
    inserirObjetivo,
    salvarOuAtualizar
};
