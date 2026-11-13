/* LISTA DE GUITARRISTAS */

let listaGuitarristas = [
    {
        nome: "Jimi Hendrix",
        img: "./assets/imgs/Jimi-Hendrix.jpg",
        curiosidade: "Revolucionou o instrumento tocando com uma guitarra destra invertida para canhoto."
    },
    {
        nome: "Eddie Van Halen",
        img: "./assets/imgs/Eddie-Van-Halen.jpg",
        curiosidade: "Popularizou a técnica de duas mãos no braço da guitarra (two-hand tapping)."
    },
    {
        nome: "Jeff Beck",
        img: "./assets/imgs/Jeff-Beck.jpg",
        curiosidade: "Dispensava o uso de palheta, controlando o som inteiramente com os dedos e a alavanca."
    },
    {
        nome: "Jimmy Page",
        img: "./assets/imgs/Jimmy-Page.jpg",
        curiosidade: "Ficou famoso por usar um arco de violino para tocar a guitarra em músicas como 'Dazed and Confused'."
    },
    {
        nome: "Steve Vai",
        img: "./assets/imgs/Steve-Vai.jpg",
        curiosidade: "Trabalhou como transcritor musical para Frank Zappa antes de alcançar a fama solo."
    },
    {
        nome: "Joe Satriani",
        img: "./assets/imgs/Joe-Satriani.jpg",
        curiosidade: "Foi professor de guitarra de grandes lendas como Kirk Hammett e Steve Vai."
    },
    {
        nome: "Stevie Ray Vaughan",
        img: "./assets/imgs/Stevie-Ray-Vaughan.jpg",
        curiosidade: "Usava cordas extremamente grossas (calibre .013) e afinava sua guitarra um tom abaixo."
    },
    {
        nome: "John Petrucci",
        img: "./assets/imgs/John-Petrucci.jpg",
        curiosidade: "É co-fundador da banda Dream Theater e mestre em métricas de compasso complexas."
    },
    {
        nome: "David Gilmour",
        img: "./assets/imgs/David-Gilmour.jpg",
        curiosidade: "Seus solos em 'Comfortably Numb' são eleitos frequentemente entre os melhores da história do rock."
    },
    {
        nome: "John McLaughlin",
        img: "./assets/imgs/John-McLaughlin.jpg",
        curiosidade: "Pioneiro da fusão de jazz com música indiana, elogiado por Miles Davis."
    },
    {
        nome: "B.B. King",
        img: "./assets/imgs/BB-King.jpg",
        curiosidade: "Batizou todas as suas famosas guitarras semi-acústicas Gibson com o nome de 'Lucille'."
    },
    {
        nome: "Gary Moore",
        img: "./assets/imgs/Gary-Moore.jpg",
        curiosidade: "Tocou com o Thin Lizzy e se consagrou como um dos maiores expoentes do blues-rock mundial."
    },
    {
        nome: "Carlos Santana",
        img: "./assets/imgs/Carlos-Santana.jpg",
        curiosidade: "Misturou rock psicodélico com ritmos latinos e salsa, marcando a história no festival de Woodstock."
    },
    {
        nome: "Brian May",
        img: "./assets/imgs/Brian-May.jpg",
        curiosidade: "Construiu sua guitarra icônica (a 'Red Special') junto com seu pai usando madeira de lareira."
    },
    {
        nome: "Slash",
        img: "./assets/imgs/Slash.jpg",
        curiosidade: "Sua cartola icônica nos primeiros anos do Guns N' Roses foi comprada em cima da hora para um show."
    },
    {
        nome: "Yngwie Malmsteen",
        img: "./assets/imgs/Yngwie-Malmsteen.jpg",
        curiosidade: "Popularizou o estilo 'Metal Neoclássico', aplicando escalas da música clássica na guitarra."
    },
    {
        nome: "Eric Clapton",
        img: "./assets/imgs/Eric-Clapton.jpg",
        curiosidade: "É o único artista induzido três vezes ao Hall da Fama do Rock and Roll."
    },
    {
        nome: "Ritchie Blackmore",
        img: "./assets/imgs/Ritchie-Blackmore.jpg",
        curiosidade: "Pioneiro do hard rock com o Deep Purple e criador do icônico riff de 'Smoke on the Water'."
    },
    {
        nome: "Tony Iommi",
        img: "./assets/imgs/Tony-Iommi.jpg",
        curiosidade: "Perdeu as pontas dos dedos em um acidente de trabalho e criou adaptadores para continuar tocando."
    },
    {
        nome: "Randy Rhoads",
        img: "./assets/imgs/Randy-Rhoads.jpg",
        curiosidade: "Misturava técnicas de guitarra clássica com o heavy metal ao lado de Ozzy Osbourne."
    },
    {
        nome: "Guthrie Govan",
        img: "./assets/imgs/Guthrie-Govan.jpg",
        curiosidade: "Conhecido mundialmente por sua versatilidade técnica absurda e improvisação impecável."
    },
    {
        nome: "Mark Knopfler",
        img: "./assets/imgs/Mark-Knopfler.jpg",
        curiosidade: "Toca guitarra exclusivamente com os dedos (fingerstyle), sem o uso de palheta."
    },
    {
        nome: "Dimebag Darrell",
        img: "./assets/imgs/Dimebag-Darrell.jpg",
        curiosidade: "Cofundador do Pantera, revolucionou o som do heavy metal moderno com seu timbre agressivo."
    }
];

/* EXIBIÇÃO DOS GUITARRISTAS */

const div_exibir = document.querySelector("#div_exibir");

div_exibir.innerHTML = "";

for (let i = 0; i < listaGuitarristas.length; i++) {

    if (i == 0) {

        div_exibir.innerHTML += `
        <div class="guitarrista">
            <img src="${listaGuitarristas[i].img}" class="item item-ativo" alt="${listaGuitarristas[i].nome}">
            <h3>${listaGuitarristas[i].nome}</h3>
            <div class="curiosidade-guitarrista">
                 ${listaGuitarristas[i].curiosidade}
            </div>
        </div>`;

    } else {

        div_exibir.innerHTML += `
        <div class="guitarrista">
            <img src="${listaGuitarristas[i].img}" class="item" alt="${listaGuitarristas[i].nome}">
            <h3>${listaGuitarristas[i].nome}</h3>
            <div class="curiosidade-guitarrista">
                 ${listaGuitarristas[i].curiosidade}
            </div>
        </div>`;
    }

}


/* CONFIGURAÇÃO DO CARROSSEL */

const guitarristas = document.querySelectorAll(".guitarrista");

const containerGaleria = document.querySelector(".container-galeria");

let guitarristaAtual = 0;

const quantidadeGuitarristas = guitarristas.length;


/* FUNÇÃO PARA AVANÇAR O CARROSSEL */

function avancarCarrossel() {

    // Retira o destaque da imagem atual
    guitarristas[guitarristaAtual].querySelector(".item").classList.remove("item-ativo");


    // Avança para o próximo guitarrista
    guitarristaAtual++;


    // Volta para o primeiro quando chegar ao final
    if (guitarristaAtual >= quantidadeGuitarristas) {

        guitarristaAtual = 0;

    }


    // Destaca a imagem do próximo guitarrista
    guitarristas[guitarristaAtual].querySelector(".item").classList.add("item-ativo");


   // Move diretamente para a posição exata (quando voltar para 0, a conta dá 0 e ele retorna ao início)
    containerGaleria.scrollTo({
        left: guitarristaAtual * (guitarristas[0].offsetWidth + 50),
        behavior: "smooth"
    });

}


// Executa automaticamente a cada 3 segundos
setInterval(avancarCarrossel, 3500);
