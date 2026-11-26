const API_URL = '/contato';

const form = document.getElementById('form-contato');
const retorno = document.getElementById('retorno');
const botao = form.querySelector('button');

function mostrar(texto, tipo) {
    retorno.textContent = texto;
    retorno.className = 'retorno ' + tipo;
}

form.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    const idUsuario = sessionStorage.ID_USUARIO || localStorage.getItem("idUsuario");

    if (!idUsuario) {
        mostrar("Para enviar uma mensagem, você precisa estar logado ou cadastrado.", "erro");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 3500);

        return;
    }

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
        mostrar('Preencha nome, e-mail e mensagem para enviar.', 'erro');
        return;
    }

    if (!form.email.checkValidity()) {
        mostrar('Digite um e-mail válido.', 'erro');
        return;
    }

    // nome e e-mail só são conferidos aqui, o banco guarda apenas o id e a mensagem
    const dados = {
        id_usuario: idUsuario,
        mensagem: mensagem
    };

    botao.disabled = true;
    mostrar('Enviando...', '');

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error('Falha ao enviar');
        }

        form.reset();
        mostrar('Mensagem enviada! Obrigado por escrever.', 'sucesso');
    } catch (erro) {
        mostrar('Não foi possível enviar agora. Tente novamente em instantes.', 'erro');
    } finally {
        botao.disabled = false;
    }
});