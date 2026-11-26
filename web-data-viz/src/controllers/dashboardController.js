var dashboardModel = require("../models/dashboardModel");

// KPIs devolvem 1 linha; se vier vazio, usamos um objeto vazio para não dar erro
function primeiraLinha(resultado) {
    return resultado[0] || {};
}

// Converte as linhas de um gráfico para { nome, total } com total numérico
function converter(resultado, colunaNome) {
    return resultado.map(function (linha) {
        return { nome: linha[colunaNome], total: Number(linha.total) };
    });
}

async function carregar(req, res) {
    try {
        // dispara as 11 consultas ao mesmo tempo e espera todas terminarem
        const [
            rTotal, rNovos, rPerfis, rGuitarristas, rNivelComum, rMensagens,
            rCadastros, rToca, rNivel, rGeneros, rObjetivos
        ] = await Promise.all([
            dashboardModel.kpiTotalUsuarios(),
            dashboardModel.kpiNovosCadastros(),
            dashboardModel.kpiPerfisPreenchidos(),
            dashboardModel.kpiGuitarristas(),
            dashboardModel.kpiNivelComum(),
            dashboardModel.kpiMensagens(),
            dashboardModel.graficoCadastros(),
            dashboardModel.graficoToca(),
            dashboardModel.graficoNivel(),
            dashboardModel.graficoGeneros(),
            dashboardModel.graficoObjetivos()
        ]);

        const total = primeiraLinha(rTotal);
        const novos = primeiraLinha(rNovos);
        const perfis = primeiraLinha(rPerfis);
        const guitarristas = primeiraLinha(rGuitarristas);
        const nivelComum = primeiraLinha(rNivelComum);
        const mensagens = primeiraLinha(rMensagens);

        res.json({
            kpis: {
                totalUsuarios: Number(total['Total de usuários cadastrados']) || 0,

                novosCadastros: Number(novos['Novos (30 dias)']) || 0,
                variacaoNovos: Number(novos['Variação (%)']) || 0,

                perfisPreenchidos: Number(perfis['Perfis Preenchidos']) || 0,
                perfisPercentual: Number(perfis['Percentual (%)']) || 0,

                guitarristas: Number(guitarristas['Guitarristas']) || 0,
                guitarristasPercentual: Number(guitarristas['Percentual (%)']) || 0,

                nivelComum: nivelComum['Nível'] || null,
                nivelAbreviacao: nivelComum['Abreviação'] || '--',
                nivelPercentual: Number(nivelComum['Percentual (%)']) || 0,

                totalMensagens: Number(mensagens['Total de Mensagens']) || 0,
                mensagensUltimos7: Number(mensagens['Últimos 7 dias']) || 0
            },
            graficos: {
                cadastros: converter(rCadastros, 'dia'),
                toca: converter(rToca, 'categoria'),
                nivel: converter(rNivel, 'nivel'),
                generos: converter(rGeneros, 'genero'),
                objetivos: converter(rObjetivos, 'objetivo')
            }
        });

    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao carregar a dashboard." });
    }
}

module.exports = {
    carregar
};