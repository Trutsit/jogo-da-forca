/*jslint browser: true*/
/*global $, jQuery, alert*/

var nJogador = [];
var listaJogadores = 0;
var sucesso = false;

function checkJogador() {
    "use strict";

    while (localStorage.getItem("Jogador" + listaJogadores)) {
        var copia = []; // faz reset ao vector
        copia = localStorage.getItem("Jogador" + listaJogadores).split(',');
        if (copia[0] === nJogador[0] && copia[1] === nJogador[1]) {
            sucesso = true;
            break;
        } else {
            listaJogadores += 1;
        }
    }

    return sucesso;
}

function loginJogador() {
    "use strict";

    nJogador.push(document.forms.login.username.value);
    nJogador.push(document.forms.login.password.value);

    if (checkJogador()) {
        sessionStorage.setItem("jogadorActual", nJogador[0].toString());
        return true;
    } else {
        return false;
    }
}

function clearForm() {
    "use strict";
    document.forms.registo.reset();
}

$(document).ready(function () {
    "use strict";

    if (sessionStorage.getItem("jogadorActual", nJogador[0])) {
        $('#login, button, #saltar').hide();
        var nomeJogador = sessionStorage.getItem("jogadorActual").split(',');
        $('#sucessoLogin').append('<p>Já tens login feito, ' + nomeJogador[0] + '. Clica <a href="jogo/jogo.html">aqui</a> para começares a jogar.</p><p>Ou então clica <a class="logout" href="#">aqui</a> para fazeres logout.</p>');
        $('#sucessoLogin').show();
    }

    $('.logout').on('click', function () {
        sessionStorage.removeItem("jogadorActual");
        $('#login, button, #saltar').show();
        $('#sucessoLogin').hide();

    });

    $('button').on('click', function () {
        if (loginJogador()) {
            $('#sucessoLogin').children('p').remove();
            var nomeJogador = sessionStorage.getItem("jogadorActual", nJogador[0]);
            $('#sucessoLogin').append('<h3>Sucesso!</h3><p>Bem-vindo, ' + nomeJogador + '. Clica <a href="jogo/jogo.html">aqui</a> para começares a jogar.');
            $('#sucessoLogin').show();
            $('#login, button, #saltar').hide();
            clearForm();
        } else {
            $('#erroLogin').show();
        }
    });
});