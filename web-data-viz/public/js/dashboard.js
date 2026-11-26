// configurações que valem para todos os gráficos
Chart.defaults.color = '#542A3D';
Chart.defaults.font.family = 'Plus Jakarta Sans, Arial, sans-serif';
Chart.defaults.plugins.legend.display = false;

// cores do tooltip (caixinha que aparece ao passar o mouse)
var tooltip = {
    backgroundColor: '#2A1216',
    titleColor: '#F1E6D2',
    bodyColor: '#F1E6D2'
};

// diminui a fonte da palheta quando o texto é grande
function ajustarPalheta(id, texto) {
    var el = document.getElementById(id);
    el.innerHTML = texto;
    if (texto.length >= 5) {
        el.style.fontSize = '13px';
    } else if (texto.length === 4) {
        el.style.fontSize = '15px';
    } else {
        el.style.fontSize = '';
    }
}

// ---------- KPIs ----------

function preencherKpis(k) {
    document.getElementById('kpiTotal').innerHTML = k.totalUsuarios;

    document.getElementById('kpiNovos').innerHTML = k.novosCadastros;

    var variacao = document.getElementById('kpiVariacao');
    if (k.variacaoNovos > 0) {
        variacao.innerHTML = '▲ ' + k.variacaoNovos + '%';
    } else if (k.variacaoNovos < 0) {
        variacao.innerHTML = '▼ ' + Math.abs(k.variacaoNovos) + '%';
    } else {
        variacao.innerHTML = '0%';
    }

    document.getElementById('kpiPerfis').innerHTML = k.perfisPreenchidos;
    document.getElementById('kpiPerfisTexto').innerHTML = k.perfisPercentual + '% do total';

    ajustarPalheta('kpiGuitarristasPct', k.guitarristasPercentual + '%');
    document.getElementById('kpiGuitarristasTexto').innerHTML = k.guitarristas + ' guitarristas';

    ajustarPalheta('kpiNivelAbrev', k.nivelAbreviacao);
    if (k.nivelComum) {
        document.getElementById('kpiNivelTexto').innerHTML = k.nivelComum + ', ' + k.nivelPercentual + '%';
    } else {
        document.getElementById('kpiNivelTexto').innerHTML = 'sem dados';
    }

    document.getElementById('kpiMensagens').innerHTML = k.totalMensagens;
    document.getElementById('kpiMensagensTexto').innerHTML = k.mensagensUltimos7 + ' nos últimos 7 dias';
}

// ---------- gráficos ----------

function graficoCadastros(lista) {

    var dados = {
        labels: lista.map(function (item) { return item.nome; }),
        datasets: [{
            label: 'Novos cadastros',
            data: lista.map(function (item) { return item.total; }),
            borderColor: '#D4822E',
            backgroundColor: 'rgba(212, 130, 46, 0.25)',
            fill: true,
            tension: 0.4
        }]
    };

    var config = {
        type: 'line',
        data: dados,
        options: {
            maintainAspectRatio: false,
            plugins: { tooltip: tooltip },
            scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } }
            }
        }
    };

    new Chart(document.getElementById('graficoCadastros'), config);
}

function graficoToca(lista, percentualTocam) {

    // acha cada categoria pelo nome (se não existir, conta 0)
    var jaToca = 0;
    var querAprender = 0;
    lista.forEach(function (item) {
        if (item.nome === 'Já toca') jaToca = item.total;
        if (item.nome === 'Quer aprender') querAprender = item.total;
    });

    // preenche o centro do donut e a legenda
    document.getElementById('donutPct').innerHTML = percentualTocam + '%';
    document.getElementById('legendaToca').innerHTML = jaToca;
    document.getElementById('legendaQuer').innerHTML = querAprender;

    var dados = {
        labels: ['Já toca', 'Quer aprender'],
        datasets: [{
            data: [jaToca, querAprender],
            backgroundColor: ['#D4822E', '#94242C']
        }]
    };

    var config = {
        type: 'doughnut',
        data: dados,
        options: {
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: { tooltip: tooltip }
        }
    };

    new Chart(document.getElementById('graficoToca'), config);
}

function graficoNivel(lista) {

    var dados = {
        labels: lista.map(function (item) { return item.nome + ' (' + item.total + ')'; }),
        datasets: [{
            label: 'Pessoas',
            data: lista.map(function (item) { return item.total; }),
            backgroundColor: ['#D4822E', '#94242C', '#542A3D']
        }]
    };

    var config = {
        type: 'bar',
        data: dados,
        options: {
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { tooltip: tooltip }
        }
    };

    new Chart(document.getElementById('graficoNivel'), config);
}

function graficoGeneros(lista) {

    var dados = {
        labels: lista.map(function (item) { return item.nome + ' (' + item.total + ')'; }),
        datasets: [{
            label: 'Votos',
            data: lista.map(function (item) { return item.total; }),
            backgroundColor: ['#D4822E', '#94242C', '#542A3D', '#EBA55C', '#754653']
        }]
    };

    var config = {
        type: 'bar',
        data: dados,
        options: {
            maintainAspectRatio: false,
            plugins: { tooltip: tooltip }
        }
    };

    new Chart(document.getElementById('graficoGeneros'), config);
}

function graficoObjetivos(lista) {

    var dados = {
        labels: lista.map(function (item) { return item.nome + ' (' + item.total + ')'; }),
        datasets: [{
            label: 'Pessoas',
            data: lista.map(function (item) { return item.total; }),
            backgroundColor: ['#D4822E', '#94242C', '#542A3D', '#EBA55C', '#754653']
        }]
    };

    var config = {
        type: 'bar',
        data: dados,
        options: {
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { tooltip: tooltip }
        }
    };

    new Chart(document.getElementById('graficoObjetivos'), config);
}

// ---------- busca os dados no backend ----------

function carregarDashboard() {
    fetch('/dashboard')
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Erro ao buscar a dashboard: ' + resposta.status);
            }
            return resposta.json();
        })
        .then(function (dados) {
            preencherKpis(dados.kpis);

            graficoCadastros(dados.graficos.cadastros);
            graficoToca(dados.graficos.toca, dados.kpis.guitarristasPercentual);
            graficoNivel(dados.graficos.nivel);
            graficoGeneros(dados.graficos.generos);
            graficoObjetivos(dados.graficos.objetivos);
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

// só depois que a fonte carregar
document.fonts.ready.then(carregarDashboard);