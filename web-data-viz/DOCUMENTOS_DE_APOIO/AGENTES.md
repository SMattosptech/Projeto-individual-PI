## Visão geral

O web-data-viz é uma aplicação web desenvolvida como modelo de referência para alunos da faculdade São Paulo Tech School utilizarem em seus projetos pessoais e em grupo. a aplicação consiste em um site institucional com funcionalidades de login, cadastro de usuários e uma área de dashboard dinâmica com gráficos, conectado ao banco de dados relacional.

## Tecnologias

- Front-end: HTML, CSS, JavaScript,Chart.js.
- Back-end: JavaScript, Node.Js, Express.
- Banco de Dados e biblioteca de conexão: MySql e mysql2.
- Gerenciamento de variáveis de ambiente: Dotenv.

## Comandos

Instalar as depêndencias do projeto:

- npm i

Inicializar o servidor da aplicação:

- npm start

Parar a execução da aplicação:

- CTRL + C

## Arquitetura

A arquitetura do projeto é organizada da seguinte forma:

- /public/ (Front-end): Contém todas as páginas HTML, estilos CSS, scripts úteis e elementos visuais.

- /src/: (Back-end): Contém a regra de negócio da aplicação, dividida em:
  - controllers/: Gerenciam as requisições e respostas das rotas.
  - models/: Realizam a comunicação e consultas com o banco de dados.
  - routes/: Definem os endpoints de comunicação da API
  - database/: Arquivos de configuração e scripts de conexão com o banco de dados.

- /node_modules/: Contém todo o pacote necessário de desenvolvimento com as dependências necessárias do projeto, referênciadas no arquivo package-lock.json.

- /.env/ e /env.dev/: Contém informações sensíveis isoladas que não devem ficar expostas no projeto, por meio de variáveis de ambiente que podem ser utilizadas em todo o projeto.

- /app.js: Arquivo principal responsável pela configuração do framework Express e centralização das rotas.

## Padrões de desenvolvimento

- Utilizar const por padrão e let apenas quando houver necessidade de reatribuição.
- Utilizar o padrão de nomenclatura camelCase para os arquivos e nomes de variáveis.
- Utilizar padrão "Conventional Commits" em todas as mensagens de commits.
- Utilizar as boas práticas de desenvolvimento limpo (Clean Code).

## Cuidados e restrições

Liste aquilo que o agente não deve fazer ou que exige atenção antes de realizar alterações.

- Não instale nenhum pacote novo sem autorização prévia
- Não desenvolva novas funcionalidades sem autorização e validação.
- Não altere a arquitetura do projeto.

## Regra geral:

Antes de implementar qualquer alteração, siga rigorosamente as tecnologias, arquitetura, convenções e restrições descritas neste documento. Caso alguma informação esteja ausente, analise o código existente e siga exatamente os padrões já adotados no projeto.
