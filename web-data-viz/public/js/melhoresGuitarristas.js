// lista de JSON 
let listaGuitarristas = [
    {
        nome: "Jimi Hendrix",
        img: "./assets/imgs/Jimi-Hendrix.jpg"
    },
    {
        nome: "Eddie Van Halen",
        img: "./assets/imgs/Eddie-Van-Halen.jpg"
    },
    {
        nome: "Jeff Beck",
        img: "./assets/imgs/Jeff-Beck.jpg"
    },
    {
        nome: "Jimmy Page",
        img: "./assets/imgs/Jimmy-Page.jpg"
    },
    {
        nome: "Steve Vai",
        img: "./assets/imgs/Steve-Vai.jpg"
    },
    {
        nome: "Joe Satriani",
        img: "./assets/imgs/Joe-Satriani.jpg"
    },
    {
        nome: "Stevie Ray Vaughan",
        img: "./assets/imgs/Stevie-Ray-Vaughan.jpg"
    },
    {
        nome: "John Petrucci",
        img: "./assets/imgs/John-Petrucci.jpg"
    },
    {
        nome: "David Gilmour",
        img: "./assets/imgs/David-Gilmour.jpg"
    },
    {
        nome: "John McLaughlin",
        img: "./assets/imgs/John-McLaughlin.jpg"
    },
    {
        nome: "B.B. King",
        img: "./assets/imgs/B.B.-King.jpg"
    },
    {
        nome: "Gary Moore",
        img: "./assets/imgs/Gary-Moore.jpg"
    },
    {
        nome: "Carlos Santana",
        img: "./assets/imgs/Carlos-Santana.jpg"
    },
    {
        nome: "Brian May",
        img: "./assets/imgs/Brian-May.jpg"
    },
    {
        nome: "Slash",
        img: "./assets/imgs/Slash.jpg"
    },
    {
        nome: "Yngwie Malmsteen",
        img: "./assets/imgs/Yngwie-Malmsteen.jpg"
    },
    {
        nome: "Eric Clapton",
        img: "./assets/imgs/Eric-Clapton.jpg"
    },
    {
        nome: "Ritchie Blackmore",
        img: "./assets/imgs/Ritchie-Blackmore.jpg"
    },
    {
        nome: "Tony Iommi",
        img: "./assets/imgs/Tony-Iommi.jpg"
    },
    {
        nome: "Randy Rhoads",
        img: "./assets/imgs/Randy-Rhoads.jpg"
    },
    {
        nome: "Guthrie Govan",
        img: "./assets/imgs/Guthrie-Govan.jpg"
    },
    {
        nome: "Mark Knopfler",
        img: "./assets/imgs/Mark-Knopfler.jpg"
    },
    {
        nome: "Dimebag Darrell",
        img: "./assets/imgs/Dimebag-Darrell.jpg"
    }
];


for (let i = 0; i < listaGuitarristas.length; i++) {
    let div_exibir;
     div_exibir.innerHTML += ` ${listaGuitarristas[i]}<br>`

}
