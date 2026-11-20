let formulario = document.getElementById("formPerfil");
let blocoCondicional = document.getElementById("blocoCondicional");
let botaoEnviar = document.getElementById("botaoEnviar");
let textoBotao = document.getElementById("textoBotao");
let erroEnvio = document.getElementById("erroEnvio");
let confirmacao = document.getElementById("confirmacao");
let botaoNovamente = document.getElementById("preencherNovamente");

let opcaoTocaSim = document.getElementById("tocaSim");
let opcaoTocaNao = document.getElementById("tocaNao");

let urlApi = "http://localhost:3333/perfil";

function atualizarTelaExtra() {
    let marcouSim = opcaoTocaSim.checked;
    let inputsExtras = blocoCondicional.getElementsByTagName("input");

    for (let i = 0; i < inputsExtras.length; i++) {
        inputsExtras[i].disabled = !marcouSim;

        if (!marcouSim) {
            inputsExtras[i].checked = false;
        }
    }

    if (marcouSim) {
        blocoCondicional.classList.add("aberto");
    } else {
        blocoCondicional.classList.remove("aberto");
    }
}

function esconderErros() {
    let perguntas = document.getElementsByClassName("pergunta");

    for (let i = 0; i < perguntas.length; i++) {
        perguntas[i].classList.remove("com-erro");

        let mensagem = perguntas[i].getElementsByClassName("mensagem-erro");

        if (mensagem.length > 0) {
            mensagem[0].hidden = true;
        }
    }

    erroEnvio.hidden = true;
}

opcaoTocaSim.addEventListener("change", atualizarTelaExtra);
opcaoTocaNao.addEventListener("change", atualizarTelaExtra);

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    esconderErros();

    let temErro = false;

    let tocaValor = "";

    if (opcaoTocaSim.checked) {
        tocaValor = "sim";
    } else if (opcaoTocaNao.checked) {
        tocaValor = "nao";
    }

    let tempoValor = formulario.elements["tempo"].value;
    let nivelValor = formulario.elements["nivel"].value;
    let generoValor = formulario.elements["genero"].value;
    let objetivoValor = formulario.elements["objetivo"].value;

    if (tocaValor == "") {
        let pergunta = document.querySelector('[data-pergunta="toca"]');
        pergunta.classList.add("com-erro");
        pergunta.getElementsByClassName("mensagem-erro")[0].hidden = false;
        temErro = true;
    }

    if (tocaValor == "sim") {
        if (tempoValor == "") {
            let pergunta = document.querySelector('[data-pergunta="tempo"]');
            pergunta.classList.add("com-erro");
            pergunta.getElementsByClassName("mensagem-erro")[0].hidden = false;
            temErro = true;
        }

        if (nivelValor == "") {
            let pergunta = document.querySelector('[data-pergunta="nivel"]');
            pergunta.classList.add("com-erro");
            pergunta.getElementsByClassName("mensagem-erro")[0].hidden = false;
            temErro = true;
        }
    }

    if (generoValor == "") {
        let pergunta = document.querySelector('[data-pergunta="genero"]');
        pergunta.classList.add("com-erro");
        pergunta.getElementsByClassName("mensagem-erro")[0].hidden = false;
        temErro = true;
    }

    if (objetivoValor == "") {
        let pergunta = document.querySelector('[data-pergunta="objetivo"]');
        pergunta.classList.add("com-erro");
        pergunta.getElementsByClassName("mensagem-erro")[0].hidden = false;
        temErro = true;
    }

    if (temErro) {
        return;
    }

    // O login salva o id do usuário em sessionStorage (ver arquivo login.html)
    // Mantemos o mesmo mecanismo para compatibilidade.
    let idUsuario = sessionStorage.ID_USUARIO || localStorage.getItem("idUsuario");

    if (!idUsuario) {
        erroEnvio.textContent = "Você precisa fazer login para enviar o perfil.";
        erroEnvio.hidden = false;
        return;
    }

    let dados = {
        id_usuario: idUsuario,
        toca_guitarra: tocaValor == "sim",
        tempo_experiencia: null,
        nivel: null,
        genero_favorito: generoValor,
        objetivo: objetivoValor,
        guitarra_atual: formulario.elements["atual"].value || null,
        guitarra_desejada: formulario.elements["desejada"].value || null
    };

    if (tocaValor == "sim") {
        dados.tempo_experiencia = tempoValor;
        dados.nivel = nivelValor;
    }

    botaoEnviar.disabled = true;
    textoBotao.textContent = "Enviando...";

    try {
        let resposta = await fetch(urlApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            formulario.hidden = true;
            confirmacao.hidden = false;
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
