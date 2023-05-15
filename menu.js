
function abrir(){
    document.getElementById("botoes").style.display = "none"
    document.getElementById("fechar").style.display = "none"
    document.getElementById("abrir").style.display = "flex"
}
function fechar(){
    document.getElementById("botoes").style.display = "flex"
    document.getElementById("fechar").style.display = "flex"
    document.getElementById("abrir").style.display = "none"
}