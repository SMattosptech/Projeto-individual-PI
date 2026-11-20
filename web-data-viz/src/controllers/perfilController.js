var perfilModel = require("../models/perfilModel");

// Valores permitidos
const temposPermitidos = [
    'Menos de 1 ano',
    '1 a 2 anos',
    '2 a 5 anos',
    'Mais de 5 anos'
];

const niveisPermitidos = [
    'Iniciante',
    'Intermediário',
    'Avançado'
];

async function salvar(req, res) {
    try {
        const body = req.body;

        const id_usuario = body.id_usuario;
        const toca_guitarra = body.toca_guitarra;
        let tempo_experiencia = body.tempo_experiencia;
        let nivel = body.nivel;
        const genero_favorito = body.genero_favorito;
        const objetivo_raw = body.objetivo;
        const guitarra_atual = body.guitarra_atual;
        const guitarra_desejada = body.guitarra_desejada;

        // Validações básicas
        if (!id_usuario) {
            return res.status(400).json({ mensagem: "id_usuario é obrigatório." });
        }

        if (!genero_favorito) {
            return res.status(400).json({ mensagem: "genero_favorito é obrigatório." });
        }

        if (!objetivo_raw) {
            return res.status(400).json({ mensagem: "objetivo é obrigatório." });
        }

        // valida tamanhos
        if (genero_favorito.length > 60) {
            return res.status(400).json({ mensagem: "genero_favorito excede 60 caracteres." });
        }

        if (guitarra_atual && guitarra_atual.length > 100) {
            return res.status(400).json({ mensagem: "guitarra_atual excede 100 caracteres." });
        }

        if (guitarra_desejada && guitarra_desejada.length > 100) {
            return res.status(400).json({ mensagem: "guitarra_desejada excede 100 caracteres." });
        }

        // Verifica usuário existe
        const usuarioResultado = await perfilModel.buscarUsuario(id_usuario);
        if (!usuarioResultado || usuarioResultado.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        // Normaliza objetivo
        const objetivo = objetivo_raw.toString().trim();
        if (objetivo.length === 0 || objetivo.length > 100) {
            return res.status(400).json({ mensagem: "objetivo inválido." });
        }

        // Se não toca, forçar nulls
        if (!toca_guitarra) {
            tempo_experiencia = null;
            nivel = null;
        } else {
            // toca_guitarra == true -> tempo e nivel obrigatórios
            if (!tempo_experiencia || !nivel) {
                return res.status(400).json({ mensagem: "tempo_experiencia e nivel são obrigatórios quando toca_guitarra for true." });
            }

            if (!temposPermitidos.includes(tempo_experiencia)) {
                return res.status(400).json({ mensagem: "tempo_experiencia inválido." });
            }

            if (!niveisPermitidos.includes(nivel)) {
                return res.status(400).json({ mensagem: "nivel inválido." });
            }
        }

        // Resolve objetivo: busca ou insere
        let objetivoResultado = await perfilModel.buscarObjetivoPorDescricao(objetivo);
        let id_objetivo;

        if (objetivoResultado && objetivoResultado.length > 0) {
            id_objetivo = objetivoResultado[0].id_objetivo;
        } else {
            const inserir = await perfilModel.inserirObjetivo(objetivo);
            // resultado de INSERT retorna objeto com insertId
            id_objetivo = inserir.insertId;
        }

        // Preparar dados para salvar
        const dadosPerfil = {
            fk_usuario: id_usuario,
            toca_guitarra: toca_guitarra ? 1 : 0,
            tempo_experiencia: tempo_experiencia,
            nivel: nivel,
            genero_favorito: genero_favorito,
            guitarra_atual: guitarra_atual,
            guitarra_desejada: guitarra_desejada,
            fk_objetivo: id_objetivo
        };

        // Salvar (insert ou update via ON DUPLICATE KEY)
        await perfilModel.salvarOuAtualizar(dadosPerfil);

        return res.status(201).json({ mensagem: "Perfil salvo com sucesso." });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ mensagem: "Erro ao salvar o perfil." });
    }
}

module.exports = {
    salvar
};
