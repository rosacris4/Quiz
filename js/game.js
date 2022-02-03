
let perguntasFeitas = [];


// Perguntas do Jogo
const perguntas = [
    {
        pergunta: "quais dessas linguagens não é uma linguagem de programação",
        resposta: ["PHP", "Javascript", "C++", "HTML"],
        correta: "resp3"
    },
    {
        pergunta: "Em que data marca o inicio da luta armada angolana",
        resposta: ["1 de janeiro", "4 de fevereiro", "4 de abril", "8 de março"],
        correta: "resp1"
    },
    {
        pergunta: "O que significa a sigla HTML",
        resposta: ["Hyper Text Mark Lang", "Hyper Tonto Maluco legal", "Hyper Text Markup Language", "Homem temente mastiga louvor"],
        correta: "resp2"
    },
    {
        pergunta: "Quais dessas linguagens é considerada de marcação",
        resposta: ["HTML", "Javascript", "PHP", "C++",],
        correta: "resp0"
    }
]

var qtdPerguntas = perguntas.length - 1;
// console.log(qtdPerguntas);
gerarPergunta(qtdPerguntas)


function gerarPergunta(maxPerguntas) {
    //gerar um numero aleatorio
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    aleatorio = Number(aleatorio);
    console.log('a pergunta sortiada foi a ' + aleatorio);

    if (!perguntasFeitas.includes(aleatorio)) {
        perguntasFeitas.push(aleatorio)

        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);

        //alimentatar a pergunta vinda do solteio
        $("#pergunta").html(p_selecionada);
        $("#pergunta").attr('data-indice', aleatorio);


        for (var i = 0; i < 4; i++) {
            $("#resp" + i).html(perguntas[aleatorio].resposta[i])
        }

        // embaralhar as respostas
        var pai = $("#respostas");
        var botoes = pai.children();
        for (var i = 1; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)))
        }

    }
    else {
        console.log('a pergunta já foi feita')
        if (perguntasFeitas.length < qtdPerguntas + 1) {
            return gerarPergunta(maxPerguntas);
        }
        else {
            console.log('Acabaram as perguntas')
            $("#quiz").addClass('oculto');
            $("#mensagem").html('parabéns, você vence!! acertou todas as perguntas')
            $("#status").removeClass('oculto');
        }
    }
}

$('.respostas').click(function () {
    if ($("#quiz").attr('data-status') !== 'travado') {
        resetaBotoes();
        $(this).addClass('selecionada');
    }

});

$("#confirm").click(function () {
    var indice = $("#pergunta").attr('data-indice');
    var respCerta = perguntas[indice].correta;
    console.log(respCerta)

    //resposta selecionada pelo usuario
    $(".respostas").each(function () {
        if ($(this).hasClass('selecionada')) {
            var respostaEscolhida = $(this).attr('id');

            if (respCerta == respostaEscolhida) {
                console.log('acertou miseravel')
                proximaPergunta()
            }
            else {
                console.log('errou')
                $("#quiz").attr('data-status', 'travado')
                $("#confirm").addClass('oculto')
                $("#" + respCerta).addClass('correta');
                $("#" + respostaEscolhida).removeClass('selecionada');
                $("#" + respostaEscolhida).addClass('errada');
                setTimeout(function () {
                    gameOver()
                }, 4000);
            }
        }
    })
});

function newGame() {
    $("#confirm").removeClass('oculto')
    $("#quiz").attr('data-status', 'ok')
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $("#quiz").removeClass('oculto');
    $("#status").addClass('oculto');
}

function proximaPergunta() {
    resetaBotoes();

    gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
    $(".respostas").each(function () {
        if ($(this).hasClass("selecionada")) {
            $(this).removeClass('selecionada')
        }
        if ($(this).hasClass("correta")) {
            $(this).removeClass('correta')
        }
        if ($(this).hasClass("errada")) {
            $(this).removeClass('errada')
        }
    });
}

function gameOver() {
    $("#quiz").addClass('oculto');
    $("#mensagem").html('Game Over!!!')
    $("#status").removeClass('oculto');
}

$("#novoJogo").click(function () {
    newGame();
})