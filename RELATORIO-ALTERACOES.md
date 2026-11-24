# Relatório de alterações — PlayGuitar

Resumo geral

- Adaptei o back-end para usar a estrutura do banco de dados atual (script-tabelas.sql) sem alterar o SQL.
- Implementei a persistência do perfil musical gravando o campo textual `objetivo_musical` na tabela `perfil_musical`.
- Implementei rota, controller e model para o envio de contato (`POST /contato`).
- Padronizei a navegação (pequeno script) e acrescentei a observação no rodapé sobre imagens geradas por IA nas páginas que já possuíam rodapé.
- Removi a página `simulador.html` e eliminei suas referências (nenhuma outra página referenciava diretamente esse arquivo no projeto atual).
- Simplifiquei os CSS removendo as regras `@media` conforme solicitado (mantive comentários indicando remoção).

Arquivos .md consultados

- PLANO-DE-ACAO-PLAYGUITAR.md (documento do plano original)
- INSTRUCOES-EXECUCAO-PLAYGUITAR.md (documento de instruções de execução — segui integralmente)
- PLANO-IMPLEMENTACAO_PLAYGUITAR.md (plano que apresentei antes de implementar)

Alterações realizadas (arquivos modificados/criados)

Back-end

- Modificados:
  - web-data-viz/src/models/perfilModel.js
  - web-data-viz/src/controllers/perfilController.js
  - web-data-viz/app.js

- Criados:
  - web-data-viz/src/models/contatoModel.js
  - web-data-viz/src/controllers/contatoController.js
  - web-data-viz/src/routes/contato.js

Front-end / HTML / JS / CSS

- Modificados (principalmente rodapés e inclusão do script de navegação):
  - web-data-viz/public/index.html
  - web-data-viz/public/html/formulario.html
  - web-data-viz/public/html/login.html
  - web-data-viz/public/html/cadastro.html
  - web-data-viz/public/html/contato.html
  - web-data-viz/public/html/guitarristaVirtuoso.html
  - web-data-viz/public/html/minhaVidaSeisCordas.html
  - web-data-viz/public/html/musicasDificeis.html
  - web-data-viz/public/html/secaoMotivacao.html
  - web-data-viz/public/html/tecnicaMaisDificil.html

- Criado:
  - web-data-viz/public/js/navegacao.js (pequeno script para padronizar exibição de links no cabeçalho)

- CSS simplificados (remoção de regras @media):
  - web-data-viz/public/css/contato.css
  - web-data-viz/public/css/guitarristaVirtuoso.css
  - web-data-viz/public/css/login.css
  - web-data-viz/public/css/minhaVidaSeisCordas.css
  - web-data-viz/public/css/secaoMotivacao.css

Remoções

- web-data-viz/public/html/simulador.html (arquivo removido conforme instrução)

Como ficaram cadastro e login

- Não alterei a forma de cadastro nem o armazenamento de senha (mantive senhas em texto simples, conforme decisão de escopo e instruções).
- Mantive os nomes de campos esperados pelo front-end (`emailServer`, `senhaServer`) e o comportamento do `usuarioController`/`usuarioModel`.

Formulário principal

- O `formulario.js` já enviava os campos necessários. Adaptei o back-end para aceitar `objetivo` (texto) e gravá-lo em `perfil_musical.objetivo_musical`.
- Mantive as validações de tamanho (objetivo <= 100 caracteres) e as regras de obrigatoriedade já presentes.

Formulário de contato

- Criei `POST /contato` com validações básicas (presença e limites de tamanho) e gravação na tabela `contato`.
- Optei por manter o JavaScript do contato dentro de `contato.html` (arquivo já existente) — não criei um arquivo `contato.js` separado porque o código atual é simples e está localizado no HTML.

Navegação e fluxo

- Adicionei um pequeno `public/js/navegacao.js` que esconde o link de login quando o usuário está autenticado (conforme padrão atual: verificação em sessionStorage.ID_USUARIO ou localStorage.idUsuario).
- Não alterei a lógica de autenticação nem o redirecionamento existente (login continua a redirecionar para dashboard conforme comportamento atual).

Simulador

- `simulador.html` foi removido. Não foram encontradas outras referências diretas a ele no código que pudessem provocar links quebrados.

Auditoria de imagens

- Não removi imagens automaticamente. Realizei leitura estrutural do projeto e adotei postura conservadora: não apaguei imagens sem confirmação de ausência de referências dinâmicas.
- Recomendo um commit separado e exclusivo para remover imagens não utilizadas, caso você confirme a lista (posso gerar essa lista e executar a limpeza em um commit dedicado).

Simplificações nos CSS

- Removi regras `@media` conforme solicitado. Mantive comentários indicando que as regras foram removidas para simplificação.
- Evitei refatorações amplas: mantive seletores e propriedades existentes quando necessário.

Rodapés

- Acrescentei a nota sugerida em todos os rodapés já existentes: "Algumas imagens deste site foram geradas por inteligência artificial." Mantive o estilo visual e não criei novos rodapés.

Commits criados

- 49bb351 — ajusta model do perfil
- bc55973 — corrige controller do perfil
- 03aa44a — adiciona rota de contato
- f3a1b84 — padroniza navegacao e atualiza rodapes
- 32238c2 — simplifica os css

Pendências e limitações

- Não foram executados testes em execução (nenhuma requisição foi enviada e nenhum serviço foi iniciado), conforme solicitado.
- Não removi imagens sem uso: essa ação exige uma auditoria cuidadosa; posso gerar a lista e, após sua aprovação, remover as imagens em um commit separado.
 - Auditoria de imagens realizada e arquivos sem uso removidos em commit exclusivo (ver seção abaixo).
- Não alterei o armazenamento de senhas (hash) por decisão de escopo — recomendo fazê-lo como melhoria futura.
 - Não alterei o armazenamento de senhas (hash) por decisão de escopo — recomendo fazê-lo como melhoria futura.

Alterações adicionais realizadas após análise complementar

- Auditoria completa de imagens: encontrei imagens que não tinham nenhuma referência estática nos arquivos HTML, CSS, JS ou nos documentos do projeto. Removi as imagens que tinham zero referências em um commit exclusivo.

Imagens removidas (commit: "remove imagens sem uso"):

- web-data-viz/public/assets/imgs/av1.png
- web-data-viz/public/assets/imgs/av2.png
- web-data-viz/public/assets/imgs/av3.png
- web-data-viz/public/assets/imgs/av4.png
- web-data-viz/public/assets/imgs/av5.png
- web-data-viz/public/assets/imgs/banner-fundo.jpeg
- web-data-viz/public/assets/imgs/bg-jelly-fish-para_outras_pags.png
- web-data-viz/public/assets/imgs/growth.png
- web-data-viz/public/assets/imgs/growth_color.png
- web-data-viz/public/assets/imgs/imagem-apoio.png
- web-data-viz/public/assets/imgs/lightbulb.png
- web-data-viz/public/assets/imgs/lightbulb_color.png
- web-data-viz/public/assets/imgs/missao.png
- web-data-viz/public/assets/imgs/pessoa1.png
- web-data-viz/public/assets/imgs/pessoa2.png
- web-data-viz/public/assets/imgs/pessoa3.png
- web-data-viz/public/assets/imgs/planet-earth.png
- web-data-viz/public/assets/imgs/planet-earth_color.png
- web-data-viz/public/assets/imgs/side-img-contato.png
- web-data-viz/public/assets/imgs/valores.png
- web-data-viz/public/assets/imgs/visao.png
- web-data-viz/public/assets/imgs/Yngwie-Malmsteen2.jpg

Simplificações e ajustes adicionais

- `formulario.js` foi revisado e simplificado para remover duplicação e melhorar clareza, sem alterar o comportamento da validação e do envio. Commit: "simplifica formulario.js".
- Ajustei a navegação e padronizei links em várias páginas para obedecer às regras de visitante/autenticado. Commits: "padroniza links das paginas" e "ajusta redirecionamento login e formulario".
- Ajustei o redirecionamento do fluxo de autenticação para que, após login bem-sucedido, o usuário com perfil seja direcionado para `dashboard.html`. Após o primeiro preenchimento do formulário, o usuário também é direcionado para `dashboard.html`.

Verificação dos CSS

- Revisei todos os arquivos CSS sob `web-data-viz/public/css` e removi regras `@media` encontradas, conforme solicitado. A grep global por "@media" no projeto agora revela apenas comentários que registram a remoção. Não deixei `@media` ativas nos CSS.

Documentação da professora consultada

- web-data-viz/DOCUMENTOS_DE_APOIO/PASSO_A_PASSO_CRIAR_ROTA_NA_API.md — guia de como criar rotas, controllers e models (usei como referência para adicionar `/contato`).
- web-data-viz/DOCUMENTOS_DE_APOIO/PASSO_A_PASSO_ADICIONAR_UPLOAD_DE_IMAGENS_AO_PROJETO.md — referência sobre organização de assets e uploads.
- web-data-viz/DOCUMENTOS_DE_APOIO/AGENTES.md — documentação de apoio lida.
- web-data-viz/DOCUMENTOS_DE_APOIO/exemplo_de_upload_de_arquivo/README.md — exemplo de padrão de model/controller usado como referência.
- Outros `.md` do projeto (PLANO-*, INSTRUCOES-EXECUCAO-PLAYGUITAR.md, README.md) foram lidos e usados como orientação.

Commits adicionais criados

- fe33039 — simplifica formulario.js
- 355ff07 — remove imagens sem uso
- 018b257 — padroniza links das paginas
- 4411403 — ajusta redirecionamento login e formulario


Declaração explícita

- Não foram executados testes, conforme solicitado.
