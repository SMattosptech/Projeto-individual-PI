var database = require("../database/config");

// ---------- KPIs ----------

function kpiTotalUsuarios() {
    return database.executar("SELECT * FROM vw_kpi_total_usuarios;");
}

function kpiNovosCadastros() {
    return database.executar("SELECT * FROM vw_kpi_novos_cadastros;");
}

function kpiPerfisPreenchidos() {
    return database.executar("SELECT * FROM vw_kpi_perfis_preenchidos;");
}

function kpiGuitarristas() {
    return database.executar("SELECT * FROM vw_kpi_guitarristas;");
}

function kpiNivelComum() {
    return database.executar("SELECT * FROM vw_kpi_nivel_comum;");
}

function kpiMensagens() {
    return database.executar("SELECT * FROM vw_kpi_mensagens;");
}

// ---------- Gráficos ----------

function graficoCadastros() {
    return database.executar("SELECT * FROM vw_grafico_cadastros;");
}

function graficoToca() {
    return database.executar("SELECT * FROM vw_grafico_toca;");
}

function graficoNivel() {
    return database.executar("SELECT * FROM vw_grafico_nivel;");
}

function graficoGeneros() {
    return database.executar("SELECT * FROM vw_grafico_generos;");
}

function graficoObjetivos() {
    return database.executar("SELECT * FROM vw_grafico_objetivos;");
}

module.exports = {
    kpiTotalUsuarios,
    kpiNovosCadastros,
    kpiPerfisPreenchidos,
    kpiGuitarristas,
    kpiNivelComum,
    kpiMensagens,
    graficoCadastros,
    graficoToca,
    graficoNivel,
    graficoGeneros,
    graficoObjetivos
};