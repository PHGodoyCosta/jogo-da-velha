var modo = ""
var jogadas = 0;
var tab = []
var blocos = []
var vitorias = 0

const j1 = document.getElementById("j1")
const j2 = document.getElementById("j2")
const start = document.getElementById("start")

function vez() {
    if (jogadas % 2 == 0) {
        return "X"
    } else {
        return "O"
    }
}

function reset() {
    for (let c=0;c < 9;c++) {
        blocos[c].style.color = "black"
        blocos[c].innerHTML = "<p>P</p>"
    }
    tab = []
    jogadas = 0
    document.getElementById("d1").style.visibility = "hidden"
    document.getElementById("d2").style.visibility = "hidden"
    document.getElementById("d3").style.visibility = "hidden"
    document.getElementById("d4").style.visibility = "hidden"
    document.getElementById("vez").innerHTML = "Movimentos: 0"
    
}
function fimPartida(resultado) {
    if (resultado) {
        vitorias = 1
        setTimeout(function(event) {
            alert("Fim de jogo")
        }, 100)
    } else {
        if (jogadas == 9) {
            setTimeout(function(event) {
                alert("Idosa...")
            }, 100)
        }
    }
    
}

function vitoria() {
    //2X,4O,5X,7O,0X,1O,3X
    //alert(tab.indexOf("0X"))
    if (tab.indexOf("0X") != -1 && tab.indexOf("1X") != -1 && tab.indexOf("2X") != -1 || tab.indexOf("0O") != -1 && tab.indexOf("1O") != -1 && tab.indexOf("2O") != -1) {
        document.getElementById("d4").style.visibility = "visible"
        document.getElementById("d4").style.top = "14%"
        fimPartida(true)

    } else if(tab.indexOf("3X") != -1 && tab.indexOf("4X") != -1 && tab.indexOf("5X") != -1 || tab.indexOf("3O") != -1 && tab.indexOf("4O") != -1 && tab.indexOf("5O") != -1) {
        document.getElementById("d4").style.visibility = "visible"
        fimPartida(true)
        
    } else if(tab.indexOf("6X") != -1 && tab.indexOf("7X") != -1 && tab.indexOf("8X") != -1 || tab.indexOf("6O") != -1 && tab.indexOf("7O") != -1 && tab.indexOf("8O") != -1) {
        document.getElementById("d4").style.visibility = "visible"
        document.getElementById("d4").style.top = "81%"
        fimPartida(true)
        
    } else if (tab.indexOf("0X") != -1 && tab.indexOf("3X") != -1 && tab.indexOf("6X") != -1 || tab.indexOf("0O") != -1 && tab.indexOf("3O") != -1 && tab.indexOf("6O") != -1){
        document.getElementById("d3").style.visibility = "visible"
        document.getElementById("d3").style.left = "15%"
        fimPartida(true)
        
    } else if (tab.indexOf("1X") != -1 && tab.indexOf("4X") != -1 && tab.indexOf("7X") != -1 || tab.indexOf("1O") != -1 && tab.indexOf("4O") != -1 && tab.indexOf("7O") != -1){
        document.getElementById("d3").style.visibility = "visible"
        fimPartida(true)
        
    } else if (tab.indexOf("2X") != -1 && tab.indexOf("5X") != -1 && tab.indexOf("8X") != -1 || tab.indexOf("2O") != -1 && tab.indexOf("5O") != -1 && tab.indexOf("8O") != -1){
        document.getElementById("d3").style.visibility = "visible"
        document.getElementById("d3").style.left = "82%"
        fimPartida(true)
        
    } else if (tab.indexOf("0X") != -1 && tab.indexOf("4X") != -1 && tab.indexOf("8X") != -1 || tab.indexOf("0O") != -1 && tab.indexOf("4O") != -1 && tab.indexOf("8O") != -1){
        document.getElementById("d2").style.visibility = "visible"
        fimPartida(true)
        
    } else if (tab.indexOf("2X") != -1 && tab.indexOf("4X") != -1 && tab.indexOf("6X") != -1 || tab.indexOf("2O") != -1 && tab.indexOf("4O") != -1 && tab.indexOf("6O") != -1){
        document.getElementById("d1").style.visibility = "visible"
        fimPartida(true)
        
    } else {
        fimPartida()
    }
}

function jogar(jogada) {
    let temporario = document.getElementById(`q${jogada}`)
    temporario.innerHTML = `<p>${vez()}</p>`
    temporario.style.color = "white"
    tab.push(`${jogada}${vez()}`)
    jogadas ++;
    document.getElementById("vez").innerHTML = "Movimentos: " + jogadas;
    vitoria()
}
function timeJogar(jogada) {
    setTimeout(function (event) {
        jogar(jogada)
    }, 1)
}

function ativandoListeners() {
    for (let c = 0;c < 9; c++) {
        blocos[c] = document.getElementById(`q${c}`)
        blocos[c].addEventListener("click", configListener)
        blocos[c].myParam = c
    }
}

function configListener(c) {
    try {
        c = c.currentTarget.myParam
    }catch {
        c = c
    }
    if (blocos[c].innerText == "P") {
        jogar(c)
        if (modo == "j1") {
            algoritimo()
        }
    }
    
}

function removendoListeners() {
    for (let c = 0; c < 9; c++) {
        blocos[c].removeEventListener("click", configListener)
    }
}

function algoritimo() {
    removendoListeners()
    var tab2 = String(tab)
    var ultimaJogada = Number(tab2[tab2.length - 2])
    if (jogadas == 0) {
        timeJogar(2);
    } else if (jogadas == 2) {
        if (tab2.slice(0, 5) == "2X,1O" || tab2.slice(0, 5) == "2X,3O" || tab2.slice(0, 5) == "2X,5O" || tab2.slice(0, 5) == "2X,7O") {
            timeJogar(4)
        } else if (tab2.slice(0, 5) == "2X,0O" || tab2.slice(0, 5) == "2X,8O") {
            timeJogar(6)
        } else if (tab2.slice(0, 5) == "2X,6O" || tab2.slice(0, 5) == "2X,4O") {
            timeJogar(8)
        }
    } else if (jogadas == 4) {
        if(ultimaJogada != 6 && (tab2.slice(0, 5) == "2X,1O" || tab2.slice(0, 5) == "2X,3O" || tab2.slice(0, 5) == "2X,5O" || tab2.slice(0, 5) == "2X,7O")) {
            timeJogar(6)
        } else {
            if (ultimaJogada == 6 && (tab2.slice(0, 5) == "2X,3O" || tab2.slice(0, 5) == "2X,5O")) {
                timeJogar(0)
            }else if (ultimaJogada == 6 && (tab2.slice(0, 5) == "2X,1O" || tab2.slice(0, 5) == "2X,7O")) {
                timeJogar(8)
            }
        }
        //jogada de praia
        if(ultimaJogada != 4 && (tab2.slice(0, 5) == "2X,0O" || tab2.slice(0, 5) == "2X,8O")) {
            timeJogar(4)
        } else if (ultimaJogada == 4 && (tab2.slice(0, 5) == "2X,8O")) {
            timeJogar(0)
        } else if (ultimaJogada == 4 && (tab2.slice(0, 5) == "2X,0O")) {
            timeJogar(8)
        }

        //Jogada container.
        if (ultimaJogada == 5 && tab2.slice(0, 5) == "2X,6O") {
            timeJogar(0)
        } else if(ultimaJogada != 5 && tab2.slice(0, 5) == "2X,6O") {
            timeJogar(5)
        }

        //Idosa
        if (ultimaJogada == 5 && tab2.slice(0, 5) == "2X,4O") {
            timeJogar(3)
        } else if (ultimaJogada != 5 && tab2.slice(0, 5) == "2X,4O") {
            timeJogar(5)
        }
    }else if (jogadas == 6) {
        //Fechada dupla do triangulo
        if (ultimaJogada != 5 && (tab2.slice(0, 8) == "2X,1O,4X" || tab2.slice(0, 8) == "2X,7O,4X")) {
            timeJogar(5)
        } else if (ultimaJogada == 5 && (tab2.slice(0, 8) == "2X,1O,4X" || tab2.slice(0, 8) == "2X,7O,4X")) {
            timeJogar(0)
        } else if (ultimaJogada != 1 && (tab2.slice(0, 8) == "2X,3O,4X" || tab2.slice(0, 8) == "2X,5O,4X")) {
            timeJogar(1)
        } else if (ultimaJogada == 1 && (tab2.slice(0, 8) == "2X,3O,4X" || tab2.slice(0, 8) == "2X,5O,4X")) {
            timeJogar(8)
            //X em cada ponta. Jogada de praia.
        }else if (ultimaJogada == 3 && (tab2.slice(0, 8) == "2X,8O,6X")) {
            timeJogar(1)
        } else if (ultimaJogada == 1 && tab2.slice(0, 8) == "2X,8O,6X") {
            timeJogar(3)
        } else if(ultimaJogada != 3 && ultimaJogada != 1 && tab2.slice(0, 8) == "2X,8O,6X") {
            timeJogar(1)
        }else if (ultimaJogada == 5 && tab2.slice(0, 8) == "2X,0O,6X") {
            timeJogar(7)
        } else if(ultimaJogada == 7 && tab2.slice(0, 8) == "2X,0O,6X") {
            timeJogar(5)
        } else if (ultimaJogada != 5 && ultimaJogada != 7 && tab2.slice(0, 8) == "2X,0O,6X") {
            timeJogar(7)
            //Fechada diagonal, jogada do container.
        } else if (ultimaJogada == 1 && (tab2.slice(0, 8) == "2X,6O,8X")) {
            timeJogar(4)
        } else if(ultimaJogada == 4 && (tab2.slice(0, 8) == "2X,6O,8X")) {
            timeJogar(1)
        } else if(ultimaJogada != 1 && ultimaJogada != 4 && (tab2.slice("2X,6O,8X"))) {
            timeJogar(1)
            //idosa
        } else if (ultimaJogada == 1 && (tab2.slice(0, 8) == "2X,4O,8X")) {
            timeJogar(7)
        } else if (ultimaJogada != 7 && ultimaJogada != 1 && tab2.slice(0, 8) == "2X,4O,8X") {
            timeJogar(1)
        } else if(ultimaJogada == 0 && (tab2.slice(0, 17) == "2X,4O,8X,5O,3X,0O")) {
            timeJogar(7)
        } else if(ultimaJogada == 6 && (tab2.slice(0, 17) == "2X,4O,8X,5O,3X,6O")) {
            timeJogar(1)
        } else if (ultimaJogada == 7 && (tab2.slice(0, 8) == "2X,4O,8X")) {
            timeJogar(1)
        }

    } else if (jogadas == 8) {
        //idosa
        //(ultimaJogada == 0 && tab2.slice(0, 17) == "2X,4O,8X,5O,3X,0O")
        if (ultimaJogada == 0 && tab2.slice(0, 17) == "2X,4O,8X,5O,3X,7O") {
            timeJogar(6)
        } else if (ultimaJogada == 0 && (tab2.slice(0, 17) == "2X,4O,8X,5O,3X,1O")) {
            timeJogar(6)
        } else if (ultimaJogada == 6 && (tab2.slice(0, 17) == "2X,4O,8X,5O,3X,1O")) {
            timeJogar(0)
        } else if (tab2.slice(0, 23) == "2X,4O,8X,5O,3X,0O,1X,7O") {
            timeJogar(6)
        } else if (tab2.slice(0, 23) == "2X,4O,8X,5O,3X,7O,1X,6O") {
            timeJogar(0)
        } else if (tab2.slice(0, 23) == "2X,4O,8X,5O,3X,0O,1X,6O") {
            timeJogar(7)
        } else if (tab2.slice(0, 23) == "2X,4O,8X,5O,3X,6O,1X,7O") {
            timeJogar(0)
        } else if (tab2.slice(0, 23) == "2X,4O,8X,5O,3X,6O,1X,0O") {
            timeJogar(7)
        }
        /*else if (ultimaJogada != 0 && tab2.slice(0, 11) == "2X,4O,8X,5O"){
            timeJogar(0)
        }*/
    }
    ativandoListeners()
}

j1.addEventListener("click", function(event) {
    modo = "j1"
})
j2.addEventListener("click", function(event) {
    modo = "j2"
})
start.addEventListener("click", function(event) {
    if (modo == "") {
        alert("Escolha um modo!")
    } else if (modo == "j1") {
        start.innerHTML = "Recomecar"
        ativandoListeners()
        reset()
        algoritimo()
    } else {
        start.innerHTML = "Recomecar"
        ativandoListeners()
        reset()
    }
})