const formulario = document.getElementById("formPerfil");
const blocoCondicional = document.getElementById("blocoCondicional");
const botaoEnviar = document.getElementById("botaoEnviar");
const textoBotao = document.getElementById("textoBotao");
const erroEnvio = document.getElementById("erroEnvio");
const confirmacao = document.getElementById("confirmacao");
const botaoNovamente = document.getElementById("preencherNovamente");

const opcaoTocaSim = document.getElementById("tocaSim");
const opcaoTocaNao = document.getElementById("tocaNao");

const urlApi = "/perfil"; // rota relativa para refletir o padrão do projeto

function atualizarTelaExtra() {
    const marcouSim = opcaoTocaSim.checked;
    const inputsExtras = blocoCondicional.querySelectorAll("input");

    // Habilita/desabilita os inputs condicionais de forma clara
    inputsExtras.forEach((inp) => {
        inp.disabled = !marcouSim;
        if (!marcouSim) inp.checked = false;
    });

    blocoCondicional.classList.toggle("aberto", marcouSim);
}

function esconderErros() {
    const perguntas = document.querySelectorAll(".pergunta");
    perguntas.forEach((p) => {
        p.classList.remove("com-erro");
        const msg = p.querySelector(".mensagem-erro");
        if (msg) msg.hidden = true;
    });

    erroEnvio.hidden = true;
}

opcaoTocaSim.addEventListener("change", atualizarTelaExtra);
opcaoTocaNao.addEventListener("change", atualizarTelaExtra);

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    esconderErros();

    let temErro = false;

    const tocaValor = opcaoTocaSim.checked ? "sim" : (opcaoTocaNao.checked ? "nao" : "");

    const tempoValor = formulario.elements["tempo"].value;
    const nivelValor = formulario.elements["nivel"].value;
    const generoValor = formulario.elements["genero"].value;
    const objetivoValor = formulario.elements["objetivo"].value;

    function marcaErro(nomeCampo) {
        const pergunta = document.querySelector('[data-pergunta="' + nomeCampo + '"]');
        if (pergunta) {
            pergunta.classList.add("com-erro");
            const m = pergunta.querySelector('.mensagem-erro');
            if (m) m.hidden = false;
        }
        temErro = true;
    }

    if (!tocaValor) marcaErro('toca');

    if (tocaValor === 'sim') {
        if (!tempoValor) marcaErro('tempo');
        if (!nivelValor) marcaErro('nivel');
    }

    if (!generoValor) marcaErro('genero');
    if (!objetivoValor) marcaErro('objetivo');

    if (temErro) return;

    // Compatibilidade com o mecanismo atual (sessionStorage)
    const idUsuario = sessionStorage.ID_USUARIO || localStorage.getItem("idUsuario");
    if (!idUsuario) {
        erroEnvio.textContent = "Você precisa fazer login para enviar o perfil.";
        erroEnvio.hidden = false;
        return;
    }

    const dados = {
        id_usuario: idUsuario,
        toca_guitarra: tocaValor === "sim",
        tempo_experiencia: tocaValor === "sim" ? tempoValor : null,
        nivel: tocaValor === "sim" ? nivelValor : null,
        genero_favorito: generoValor,
        objetivo: objetivoValor,
        guitarra_atual: formulario.elements["atual"].value || null,
        guitarra_desejada: formulario.elements["desejada"].value || null
    };

    botaoEnviar.disabled = true;
    textoBotao.textContent = "Enviando...";

    try {
        const resposta = await fetch(urlApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            // Direciona para a dashboard após salvar o perfil (fluxo de primeiro acesso)
            window.location = '../index.html';
        } else {
            erroEnvio.textContent = "Não foi possível enviar agora. Tente novamente.";
            erroEnvio.hidden = false;
        }
    } catch (erro) {
        erroEnvio.textContent = "Não foi possível enviar agora. Tente novamente.";
        erroEnvio.hidden = false;
    }

    botaoEnviar.disabled = false;
    textoBotao.textContent = "Enviar respostas";
});

botaoNovamente.addEventListener("click", function () {
    formulario.reset();
    atualizarTelaExtra();
    esconderErros();

    confirmacao.hidden = true;
    formulario.hidden = false;
});

atualizarTelaExtra();
