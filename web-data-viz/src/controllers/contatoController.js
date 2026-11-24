var contatoModel = require("../models/contatoModel");

async function enviar(req, res) {
    try {
        const nome = req.body.nome;
        const email = req.body.email;
        const mensagem = req.body.mensagem;

        if (!nome || !email || !mensagem) {
            return res.status(400).json({ mensagem: "nome, email e mensagem são obrigatórios." });
        }

        if (nome.length > 100) {
            return res.status(400).json({ mensagem: "nome excede 100 caracteres." });
        }

        if (email.length > 150) {
            return res.status(400).json({ mensagem: "email excede 150 caracteres." });
        }

        if (mensagem.length > 1000) {
            return res.status(400).json({ mensagem: "mensagem excede 1000 caracteres." });
        }

        await contatoModel.salvarContato({ nome, email, mensagem });

        return res.status(201).json({ mensagem: "Contato salvo com sucesso." });
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ mensagem: "Erro ao salvar contato." });
    }
}

module.exports = {
    enviar
};
