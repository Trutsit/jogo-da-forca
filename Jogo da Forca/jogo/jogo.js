/*jslint browser: true*/
/*global $, jQuery, alert*/


var objFacil = ["caneta", "rato", "copo", "mesa", "caixa"],
    objNormal = ["mochila", "computador", "lapiseira", "teclado", "candeeiro"],
    objDificil = ["microondas", "jaez", "candelabro", "tomada", "cadeira"];

var aniFacil = ["gato", "rato", "tigre", "pardal", "pomba"],
    aniNormal = ["zebra", "minhoca", "okapi", "toupeira", "elefante"],
    aniDificil = ["rinoceronte", "tamarin", "axolotl", "alpaca", "tarsier"];

var corFacil = ["azul", "verde", "branco", "preto", "prata"],
    corNormal = ["violeta", "magenta", "puke", "zaffre", "labrador"],
    corDificil = ["marrom", "pervenche", "verditer", "gingerline", "falu"];

var i = 0,
    l = 0,
    k = 0;

var usadas = '';
var tentativas = 6; // vai subtraindo quando erra
var pontuacao = 0; // vai aumentando ou diminuindo
var contadorTempo = 0;


//FUNÇÃO - recebe a letra
function recebeLetra() {
    "use strict";

    return document.forms.resposta.elements.letra.value;
}

function letraRandom() {
    "use strict";

    var letrasPossiveis = "abcdefghijklmnopqrstuvwxyz",
        x = Math.floor(Math.random() * letrasPossiveis.length),
        a,
        random = letrasPossiveis.charAt(x); // escolhe a letra mediante o numero aleatorio

    if (usadas !== null) {
        for (a = 0; a < usadas.length; a += 1) {
            if (random === usadas.charAt(a)) {
                x = Math.floor(Math.random() * letrasPossiveis.length);
                random = letrasPossiveis.charAt(x);
                a = 0;
            }
        }
    }
    return random;
}

//FUNÇÃO - junta as preferências do jogador ao seu array
function addInfo(modo, dificuldade) {
    "use strict";

    var copiaArray = [],
        arrayTemp = [];

    if (sessionStorage.getItem("jogadorActual")) {
        copiaArray[0] = sessionStorage.getItem("jogadorActual"); //username
        copiaArray[1] = modo;
        copiaArray[2] = dificuldade;
        sessionStorage.clear();
        sessionStorage.setItem("jogadorActual", copiaArray);
    }
}

//FUNÇÃO - junta o score do jogador ao seu array no fim do jogo
function addScore() {
    "use strict";

    var copiaArray = [],
        arrayTemp = [];

    if (sessionStorage.getItem("jogadorActual")) {
        copiaArray = sessionStorage.getItem("jogadorActual").split(',');
        copiaArray[3] = pontuacao;
        sessionStorage.clear();
        sessionStorage.setItem("jogadorActual", copiaArray);
    }
}

//FUNCAO - junta o tempo ao array do jogador
function addTempo() {
    "use strict";

    var copiaArray = [],
        arrayTemp = [];

    if (sessionStorage.getItem("jogadorActual")) {
        copiaArray = sessionStorage.getItem("jogadorActual").split(',');
        copiaArray[4] = contadorTempo;
        sessionStorage.clear();
        sessionStorage.setItem("jogadorActual", copiaArray);
    }
}

//FUNÇÃO - guarda na storage uma lista com os dados dos jogos completados
function addListaScores() {
    "use strict";

    var indexUsers = 0,
        counter,
        array1 = [],
        array2 = sessionStorage.getItem("jogadorActual").split(',');

    if (!localStorage.getItem('ListaScores' + indexUsers)) {
        for (counter = 0; counter < array2.length; counter += 1) {
            array1[counter] = array2[counter];
        }
    } else {
        while (localStorage.getItem('ListaScores' + indexUsers)) {
            indexUsers += 1;
        }
        for (counter = 0; counter < array2.length; counter += 1) {
            array1[counter] = array2[counter];
        }
    }

    localStorage.setItem('ListaScores' + indexUsers, array1.toString()); // key: numero, value: {username, modo, dificuldade, tempo, score}

    sessionStorage.clear();
    sessionStorage.setItem('jogadorActual', array2[0]);
}

//FUNÇÃO - desenha o homenzinho na forca
function enforcado() {
    "use strict";

    if (tentativas === 5) {
        $('#forca1').attr("src", "../img/1.png");
    } else if (tentativas === 4) {
        $('#forca1').attr("src", "../img/2.png");
    } else if (tentativas === 3) {
        $('#forca1').attr("src", "../img/3.png");
    } else if (tentativas === 2) {
        $('#forca1').attr("src", "../img/4.png");
    } else if (tentativas === 1) {
        $('#forca1').attr("src", "../img/5.png");
    } else if (tentativas === 0) {
        $('#forca1').attr("src", "../img/6.png");
    }
}

//FUNÇÃO - escolhe a palavra mediante as definições
function getPalavra(tema, dificuldade) {
    "use strict";

    var x = Math.floor(Math.random() * 4), // devolve um numero inteiro entre 0 e 5 (tamanho do array)
        palavra = '';

    switch (tema) {
    case 'objectos':
        if (dificuldade === 'facil') {
            palavra = objFacil[x];
        } else if (dificuldade === 'normal') {
            palavra = objNormal[x];
        } else if (dificuldade === 'dificil') {
            palavra = objDificil[x];
        }
        break;

    case 'animais':
        if (dificuldade === 'facil') {
            palavra = aniFacil[x];
        } else if (dificuldade === 'normal') {
            palavra = aniNormal[x];
        } else if (dificuldade === 'dificil') {
            palavra = aniDificil[x];
        }
        break;

    case 'cores':
        if (dificuldade === 'facil') {
            palavra = corFacil[x];
        } else if (dificuldade === 'normal') {
            palavra = corNormal[x];
        } else if (dificuldade === 'dificil') {
            palavra = corDificil[x];
        }
        break;
    }
    return palavra;
}


//FUNÇÃO - relogio do jogo
function tempoJogo() {
    "use strict";

    var minutos,
        segundos;

    setTimeout(tempoJogo, 1000);
    contadorTempo += 1;

    if (contadorTempo < 60) {
        document.getElementById('relogio').innerHTML = contadorTempo + 's';
    } else {
        minutos = Math.floor(contadorTempo / 60);
        segundos = contadorTempo - minutos * 60;
        document.getElementById('relogio').innerHTML = minutos + 'm ' + segundos + 's';
    }
}

//FUNÇÃO - "transforma" o tempo em pontuação
function tempoScore() {
    "use strict";

    if (contadorTempo < 15) {
        pontuacao += 10;
    } else if (contadorTempo < 30) {
        pontuacao += 6;
    } else if (contadorTempo < 45) {
        pontuacao += 3;
    }

}

//FUNÇÃO - apaga o formulario
function clearForm() {
    "use strict";
    document.forms.resposta.reset();
}

//FUNÇÕES - função principal que corre o jogo
function jogoForca(modo, dificuldade, tema) {
    "use strict";

    tempoJogo(); // inicia o relogio

    var respostaJogador = '',
        respostaCopia = '',
        letra = '',
        palavra = getPalavra(tema, dificuldade);

    while (i < palavra.length) {
        respostaJogador += "-";
        respostaCopia += "-";
        i += 1;
    }

    $('#temaPalavra').append('O tema da palavra é "<strong>' + tema + '</strong>".');
    $('#mensagem').append("<p>A palavra tem  " + palavra.length.toString() + " letras.</p>");
    $('#tracinhos').append("<p>" + respostaJogador + "</p>"); // apresenta os tracinhos correspondentes a cada letra na página

    /*                      MODO RANDOM                     */
    /*                      MODO RANDOM                     */
    /*                      MODO RANDOM                     */

    if (modo.toString() === 'random') {

        letra = letraRandom();
        $('#letraRand').append('<p>' + letra + '</p>');

        $('#nao').on('click', function () {
            letra = letraRandom();
            $('#letraRand').children().remove();
            $('#letraRand').append('<p>' + letra + '</p>');
        });

        $('#sim').on('click', function () {

            if (usadas === null) {
                usadas = letra;
            } else {
                usadas += letra;
            }

            l = 0; //
            k = 0; // faz-se reset aos contadores

            //verifica se acertou alguma letra e substitui na string da resposta
            while (l < palavra.length) {
                if (letra === palavra.charAt(l)) {
                    pontuacao += 2;
                    respostaJogador = respostaJogador.substituir(l, palavra.charAt(l));
                }
                l += 1;
            }

            // compara com a resposta anterior e, se forem diferentes (tiver acertado uma letra), actualiza a cópia
            // se forem as mesmas é porque não acertou e reduz o numero de tentativas
            if (respostaJogador !== respostaCopia) {
                while (k < palavra.length) {
                    respostaCopia = respostaCopia.substituir(k, respostaJogador.charAt(k));
                    k += 1;
                }
            } else {
                tentativas -= 1;
                pontuacao -= 1;
                if (tentativas > 1) {
                    $('#mensagem').children().remove();
                    $('#mensagem').append("<p>Letra errada. Tens mais " + tentativas + " tentativas.</p>");
                    $('#letrasErradas').children('p').remove();
                    $('#letrasErradas').append(letra + " ");

                    enforcado();
                } else if (tentativas === 1) {
                    $('#mensagem').children().remove();
                    $('#mensagem').append("<p>Letra errada. Tens mais 1 tentativa.</p>");
                    $('#letrasErradas').append(letra);

                    enforcado();
                }
            }

            // quebra o ciclo se o jogador esgotar as tentativas e diz a resposta
            // caso contrario, continua a mostrar as letras adivinhadas ate agora pelo jogador
            if (tentativas === 0) {
                enforcado();
                $('#mensagem').children().remove();
                $('#modoRandom, #relogio').hide();
                $('#mensagem').append("<p> Perdeste. A palavra era: " + palavra + "</p>");
                $('#novoJogo').show();
            } else {
                $('#tracinhos').children().remove();
                $('#tracinhos').append("<p>" + respostaJogador.toString() + "</p>");

                if (respostaJogador === palavra) {
                    if (dificuldade === 'facil') {
                        pontuacao += 5;
                    } else if (dificuldade === 'normal') {
                        pontuacao += 10;
                    } else if (dificuldade === 'dificil') {
                        pontuacao += 15;
                    }

                    clearTimeout();
                    tempoScore();
                    addScore();
                    addTempo();

                    if (tentativas === 6) {
                        $('#letrasErradas').append(' 0').css('color', 'green');
                    }

                    $('#mensagem').children().remove();
                    $('#mensagem').append("<p>Parabéns, acertaste a palavra! Fizeste " + pontuacao + " pontos!</p>");
                    $('#modoRandom, #relogio').hide();
                    $('#registoScore').show();
                    $('#novoJogo').show();

                    $('#registoBotao').on('click', function () {

                        if (sessionStorage.getItem("jogadorActual")) {
                            addListaScores();
                            $('#registoBotao').hide();
                            $('#mensagemScore').attr('class', 'w3-section w3-green');
                            $('#mensagemScore').append('<p>Pontuação registada com sucesso!</p>');
                            $('#mensagemScore').show();
                        } else {
                            $('#registoBotao').hide();
                            $('#mensagemScore').attr('class', 'w3-red');
                            $('#mensagemScore').append('<p>Infelizmente, para registares o score, tens de criar uma conta primeiro.</p>');
                            $('#mensagemScore').show();
                        }

                    });
                }
            }
        });
    } else {
        /*                      MODO NORMAL                     */
        /*                      MODO NORMAL                     */
        /*                      MODO NORMAL                     */

        $('#botaoResposta').on('click', function () {

            letra = recebeLetra().toLowerCase();

            l = 0; //
            k = 0; // faz-se reset aos contadores

            //verifica se acertou alguma letra e substitui na string da resposta
            while (l < palavra.length) {
                if (letra === palavra.charAt(l)) {
                    pontuacao += 2;
                    respostaJogador = respostaJogador.substituir(l, palavra.charAt(l));
                }
                l += 1;
            }

            // compara com a resposta anterior e, se forem diferentes (tiver acertado uma letra), actualiza a cópia
            // se forem as mesmas é porque não acertou e reduz o numero de tentativas
            if (respostaJogador !== respostaCopia) {
                while (k < palavra.length) {
                    respostaCopia = respostaCopia.substituir(k, respostaJogador.charAt(k));
                    k += 1;
                }
            } else {
                tentativas -= 1;
                pontuacao -= 1;
                if (tentativas > 1) {
                    $('#mensagem').children().remove();
                    $('#mensagem').append("<p>Letra errada. Tens mais " + tentativas + " tentativas.</p>");
                    $('#letrasErradas').children('p').remove();
                    $('#letrasErradas').append(letra + " ");

                    enforcado();
                } else if (tentativas === 1) {
                    $('#mensagem').children().remove();
                    $('#mensagem').append("<p>Letra errada. Tens mais 1 tentativa.</p>");
                    $('#letrasErradas').append(letra);

                    enforcado();
                }
            }

            // quebra o ciclo se o jogador esgotar as tentativas e diz a resposta
            // caso contrario, continua a mostrar as letras adivinhadas ate agora pelo jogador
            if (tentativas === 0) {
                enforcado();
                $('#mensagem').children().remove();
                $('#modoRandom, #relogio').hide();
                $('#mensagem').append("<p> Perdeste. A palavra era: " + palavra + "</p>");
                $('#novoJogo').show();
            } else {
                $('#tracinhos').children().remove();
                $('#tracinhos').append("<p>" + respostaJogador.toString() + "</p>");

                if (respostaJogador === palavra) {
                    pontuacao += 5;

                    clearTimeout();
                    tempoScore();
                    addScore();
                    addTempo();

                    if (tentativas === 6) {
                        $('#letrasErradas').append(' 0').css('color', 'green');
                    }

                    $('#mensagem').children().remove();
                    $('#mensagem').append("<p>Parabéns, acertaste a palavra! Fizeste " + pontuacao + " pontos!</p>");
                    $('#modoNormal, #relogio').hide();
                    $('#registoScore').show();
                    $('#novoJogo').show();

                    $('#registoBotao').on('click', function () {

                        if (sessionStorage.getItem("jogadorActual")) {
                            addListaScores();
                            $('#registoBotao').hide();
                            $('#mensagemScore').attr('class', 'w3-section w3-green');
                            $('#mensagemScore').append('<p>Pontuação registada com sucesso!</p>');
                            $('#mensagemScore').show();
                        } else {
                            $('#registoBotao').hide();
                            $('#mensagemScore').attr('class', 'w3-red');
                            $('#mensagemScore').append('<p>Infelizmente, para registares o score, tens de criar uma conta primeiro e ter login feito.</p>');
                            $('#mensagemScore').show();
                        }
                    });
                }
            }
            clearForm();
        });
    }
}

// FUNÇÃO - substitui a letra inserida pelo utilizador numa string
String.prototype.substituir = function (indice, caracter) {
    "use strict";

    return this.substr(0, indice) + caracter + this.substr(indice + 1);
};


$(document).ready(function () {
    "use strict";

    $('#botaoInicia').on('click', function () {
        var modo = document.forms.modo.option.value.toString(),
            dificuldade = document.forms.dificuldade.option.value.toString(),
            tema = document.forms.tema.option.value.toString();

        addInfo(modo, dificuldade); //junta a info ao array do jogador

        $('#preferencias').hide();
        $('#elemJogo').css('display', 'block');
        if (modo !== 'random') {
            $('#modoRandom').hide();
        } else {
            $('#modoNormal').hide();
        }

        jogoForca(modo, dificuldade, tema); //inicia o jogo

    });
});