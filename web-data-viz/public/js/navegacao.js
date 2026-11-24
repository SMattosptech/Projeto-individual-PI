// Script simples para padronizar exibição de links no cabeçalho conforme
// o estado de autenticação adotado pelo projeto (sessionStorage / localStorage).
// Não implementa segurança, apenas ajusta a apresentação.
(function () {
    try {
        // O projeto salva o id do usuário em sessionStorage.ID_USUARIO
        const estaLogado = sessionStorage.ID_USUARIO || localStorage.getItem("idUsuario");

        if (estaLogado) {
            // Esconde links de login caso existam
            const seletorLogin = 'header a[href$="login.html"], header a[href*="/login.html"], header a[href*="login.html"]';
            const elementoLogin = document.querySelector(seletorLogin);
            if (elementoLogin) elementoLogin.style.display = 'none';

            // Se existir um link para perfil, deixa visível (caso estivesse oculto por outros arquivos)
            const seletorPerfil = 'header a[href$="perfil.html"], header a[href*="/perfil.html"], header a[href*="perfil.html"]';
            const elementoPerfil = document.querySelector(seletorPerfil);
            if (elementoPerfil) elementoPerfil.style.display = '';
        }
    } catch (erro) {
        // Não interrompe a página em caso de erro de execução
        console.error('navegacao.js:', erro);
    }
})();
