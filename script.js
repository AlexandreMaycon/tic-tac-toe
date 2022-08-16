var player = "Sonic";
var numJog = 0;
var jogando = true;

function checkjogo(id) {
    var opt = verificaSrc(id)
    var pc = document.getElementById('escolhaS').checked;
    if (opt == "transp.png" && jogando) {

    document.getElementById(id).src = "img/" + player + ".png";

        numJog++;

        if (wincheck()) {
            document.getElementById("vencedor").innerHTML = "O vencedor é " + player;
            document.getElementById("vencedor").style.border = "1px solid #transparent";
            document.getElementById("vencedor").style.background = "rgba(8, 50, 236, 0.7)";
            document.getElementById("vencedor").style.boxShadow = "10px 5px 5px black";
            jogando = false;
            return false;
        }
    
        if (numJog >= 9) {
            jogando = false;
            document.getElementById("vencedor").innerHTML = "Deu Velha!";
            document.getElementById("vencedor").style.border = "1px solid #transparent";
            document.getElementById("vencedor").style.background = "rgba(8, 50, 236, 0.7)";
            document.getElementById("vencedor").style.boxShadow = "10px 5px 5px black";
            return false;
        }

        if (player == "Sonic") {
            player = "Tails";
        } else {
            player = "Sonic";
        }
    }

    if (pc && player == 'Tails') {
        checkjogo(jogoDoPc());
    }

    function jogoDoPc() {
        if (verificaSrc('c5') == "transp.png") {
            return "c5";
        }
        return "c" + Math.floor((Math.random() * 9) + 1)
    }
}

function verificaSrc(id) {
    var file = document.getElementById(id).src;
    return file.substring(file.length - 10, file.length);
}

function resetgame(){
    for(var id=1; id <= 9; id++){
        var reset = document.getElementById('c' + id);
        reset.src = "img/transp.png";
    }
    document.getElementById("vencedor").innerHTML = "";
    document.getElementById("vencedor").style.background="";
    document.getElementById("vencedor").style.border = "";
    document.getElementById("vencedor").style.boxShadow = "";
    numJog=0;
    player="Sonic";
    jogando=true;
}

function wincheck() {

    var tipo_de_vitoria = [
        [1, 2, 3], // IDs // 0:1 1:2 2:3
        [4, 5, 6],
        [7, 8, 9],

        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        [1, 5, 9],
        [3, 5, 7],
    ]
    for(let IDs of tipo_de_vitoria){
        var p0 = document.getElementById(`c${IDs[0]}`).id
        var p1 = document.getElementById(`c${IDs[1]}`).id
        var p2 = document.getElementById(`c${IDs[2]}`).id

        if(verificaSrc(p0) == verificaSrc(p1) && verificaSrc(p0) == verificaSrc(p2) 
            && verificaSrc(p0) != 'transp.png'){

            document.querySelectorAll(`img[id*='c']`).forEach((slot)=>{
                if(slot.id != p0 && slot.id != p1 && slot.id != p2){
                    slot.src = 'img/moeda.gif';
                }
            })
            return true;
        }
    }
    return false;
}