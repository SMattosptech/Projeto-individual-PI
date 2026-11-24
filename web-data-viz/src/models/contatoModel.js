const mysql = require('mysql2/promise');

const mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

async function salvarContato(dados) {
    const conexao = await mysql.createConnection(mySqlConfig);
    try {
        const sql = `INSERT INTO contato (nome, email, mensagem) VALUES (?, ?, ?)`;
        const valores = [dados.nome, dados.email, dados.mensagem];
        const [result] = await conexao.execute(sql, valores);
        return result;
    } finally {
        await conexao.end();
    }
}

module.exports = {
    salvarContato
};
