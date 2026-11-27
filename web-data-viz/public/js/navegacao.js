(function () {
    try {
        // salva o id do usuário em sessionStorage.ID_USUARIO
        const estaLogado = sessionStorage.ID_USUARIO || localStorage.getItem("idUsuario");

        if (estaLogado) {
            // Esconde links de login caso existam
            const seletorLogin = 'header a[href$="login.html"], header a[href*="/login.html"], header a[href*="login.html"]';
            const elementoLogin = document.querySelector(seletorLogin);
            if (elementoLogin) elementoLogin.style.display = 'none';

            const seletorCadastro = 'header a[href$="cadastro.html"], header a[href*="/cadastro.html"], header a[href*="cadastro.html"]';
            const elementoCadastro = document.querySelector(seletorCadastro);
            if (elementoCadastro) {
                elementoCadastro.style.display = 'none';
            }

        }
    } catch (erro) {
        // Não interrompe a página em caso de erro de execução
        console.error('navegacao.js:', erro);
    }
})();
