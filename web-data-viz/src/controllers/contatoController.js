var contatoModel = require("../models/contatoModel");

async function enviar(req, res) {
    try {
        const id_usuario = req.body.id_usuario;
        const mensagem = req.body.mensagem ? req.body.mensagem.toString().trim() : "";

        if (!id_usuario) {
            return res.status(400).json({ mensagem: "id_usuario é obrigatório." });
        }

        if (!mensagem) {
            return res.status(400).json({ mensagem: "A mensagem é obrigatória." });
        }

        if (mensagem.length > 1000) {
            return res.status(400).json({ mensagem: "A mensagem excede 1000 caracteres." });
        }

        await contatoModel.salvarContato({ fk_usuario: id_usuario, mensagem: mensagem });

        return res.status(201).json({ mensagem: "Contato salvo com sucesso." });
    } catch (erro) {
        console.log(erro);

        // o banco recusa quando o id_usuario não existe na tabela usuario
        if (erro.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        return res.status(500).json({ mensagem: "Erro ao salvar contato." });
    }
}

module.exports = {
    enviar
};