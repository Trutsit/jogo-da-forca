/*jslint browser: true*/
/*global $, jQuery, alert*/

//FUNÇÃO - segundos -> minutos e segundos
function transformaSegundos(x) {
    "use strict";

    var minutos,
        segundos,
        resultado;


    if (x > 59) {
        minutos = Math.floor(x / 60);
        segundos = x - minutos * 60;
        resultado = minutos.toString() + 'm' + segundos.toString() + 's';
    } else {
        resultado = x + 's';
    }

    return resultado;
}

$(document).ready(function () {
    "use strict";

    var username,
        score,
        modo,
        dificuldade,
        tempo,
        arrayCopia,
        indexUsers = 0;

    while (localStorage.getItem('ListaScores' + indexUsers)) {
        arrayCopia = localStorage.getItem('ListaScores' + indexUsers).split(',');
        username = arrayCopia[0];
        modo = arrayCopia[1];
        dificuldade = arrayCopia[2];
        score = arrayCopia[3];
        tempo = transformaSegundos(arrayCopia[4]);

        //CENAS DA TABELA
        $('tbody').append('<tr id="tr_' + indexUsers + '"></tr>');
        $('#tr_' + indexUsers).append('<th>' + username + '</th><th>' + score + '</th><th>' + modo + '</th><th>' + dificuldade + '</th><th>' + tempo + '</th>');

        indexUsers += 1;

    }

});