var nJogador = [];
var listaJogadores = 0;
var sucesso = true;

function checkUsername() {
    "use strict";

    while (localStorage.getItem("Jogador" + listaJogadores)) {
        var copia = []; // faz reset ao vector
        copia = localStorage.getItem("Jogador" + listaJogadores).split(',');
        if (copia[0] !== nJogador[0]) {
            listaJogadores += 1;
        } else {
            sucesso = false;
            break;
        }
    }

    return sucesso;
}

function addJogador() {
    "use strict";

    nJogador.push(document.forms.registo.username.value);
    nJogador.push(document.forms.registo.password.value);
    nJogador.push(document.forms.registo.nome.value);
    nJogador.push(document.forms.registo.email.value);
    nJogador.push(document.forms.registo.data.value);

    if (checkUsername()) {
        localStorage.setItem("Jogador" + listaJogadores, nJogador.toString());
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
    
    //if jogadorTemporario existir, adiciona o a lista de jogadores

    $('button').on('click', function () {
        if (addJogador()) {
            $('#sucessoRegisto').show();
            $('#sucessoRegisto').append('<p>A tua conta foi registado com sucesso, ' + nJogador[0] + '!</p><p>Faz login <a href="../inicio.html">aqui</a> e começa já a jogar.');
            clearForm();
        } else if (!addJogador()) {
            $('#erroRegisto').show();
        }
    });
});