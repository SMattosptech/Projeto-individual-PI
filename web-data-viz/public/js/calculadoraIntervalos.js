let notas = [
    "Dó", "Dó#", "Ré", "Ré#",
    "Mi", "Fá", "Fá#", "Sol",
    "Sol#", "Lá", "Lá#", "Si"
];

function calcularIntervalo() {

    let notaInicial = document.getElementById("notaInicial").value;
    let notaFinal = document.getElementById("notaFinal").value;

    let posicaoInicial = notas.indexOf(notaInicial);
    let posicaoFinal = notas.indexOf(notaFinal);

    // calcula a distância entre as notas, considerando uma oitava
    let distancia = (posicaoFinal - posicaoInicial + 12) % 12;

    // se as notas forem iguais, considera uma oitava completa (12 semitons)
    if (distancia === 0) {
        distancia = 12;
    }

    document.getElementById("resultadoIntervalo").innerHTML =
        "A distância entre " + notaInicial + " e " + notaFinal +
        " é de " + distancia + " semitons.";

}
