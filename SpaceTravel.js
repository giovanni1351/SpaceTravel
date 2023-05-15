let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width
let height = canvas.height
let playerX = width / 2;
let playerY = height/10*5;
let playerSpeed = 5;
let playerSize = 40;
let keys = {};
let obstacles = [];
let boosts = [];
let debufs = [];
let cronometro = 0
let dif = 20
let speedobs = 5
let playerImg = new Image();
playerImg.src = 'nave.png';
let isPaused = false;
let dificuldades = document.getElementById("dificuldades")
let matrix = document.getElementById("matrix")
let botton = document.getElementById("jogar")
let win = document.getElementById("win")
let restart = document.getElementById("restart")
let taxa = 0.1
let bonus = 0.3
let taxaD = 0.2
class Obstacle {
    constructor() {
        this.x = Math.random() * width;
        this.y = -20;
        this.speed = Math.random() * 4 + speedobs;
        this.size = 20;
        this.image = new Image();
        this.image.src = 'Estrela-PNG.png';
    }

    update() {
        this.y += this.speed;

        if (this.y > height + this.size) {
            let index = obstacles.indexOf(this);
            obstacles.splice(index, 1);
        }

        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}
class Boost {
    constructor() {
        this.x = Math.random() * width;
        this.y = -20;
        this.speed = Math.random() * 4 + speedobs - 3;
        this.size = 20;
        this.image = new Image();
        this.image.src = 'gasolina.png';
    }

    update() {
        this.y += this.speed;

        if (this.y > height + this.size) {
            let index = boosts.indexOf(this);
            boosts.splice(index, 1);
        }

        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}
class debuf {
    constructor() {
        this.x = -20;
        this.y = Math.random() * height;
        this.speed = Math.random() * 4 + speedobs - 5;
        this.size = 20;
        this.image = new Image();
        this.image.src = 'meteoro.png';
    }

    update() {
        this.x += this.speed;

        if (this.y > height + this.size) {
            let index = debufs.indexOf(this);
            debufs.splice(index, 1);
        }

        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

function contar(){ setInterval( function (){
    if (isPaused) {
        return;
    }
    cronometro = cronometro + 0.01
},10)}

function update() {
    requestAnimationFrame(update);

    if (keys.ArrowLeft && playerX - playerSize / 2 > 0 || keys.KeyA && playerX - playerSize / 2 > 0) {
        playerX -= playerSpeed;
    }
    if (keys.ArrowRight && playerX + playerSize / 2 < width || keys.KeyD && playerX + playerSize / 2 < width) {
        playerX += playerSpeed;
    }
    if (keys.ArrowUp && playerY + playerSize / 2 > 0 || keys.KeyW && playerY + playerSize / 2 > 0) {
        playerY -= playerSpeed;
    }
    if (keys.ArrowDown && playerY + playerSize / 2 < height || keys.KeyS && playerY + playerSize / 2 < height) {
        playerY += playerSpeed;
    }
    if (isPaused) {

        return;
        ctx.fillStyle = 'White';
        ctx.font = '25px Arial';
        ctx.fillText('jogo Pausado!!!', width / 2 - 200, height / 2);
        ctx.fillText('Aperte o R para sair!!!', width / 2 - 200, height / 3);
    }
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(playerImg, playerX - playerSize / 2, playerY - playerSize / 2, playerSize, playerSize);
    ctx.fillStyle = 'White';
    ctx.font = '40px Arial Black';
    ctx.fillText(`${cronometro.toFixed(2)} s`, 20, 40);

    if (cronometro >= dif) {
        ctx.fillStyle = 'White';
        ctx.font = '25px Arial';
        ctx.fillText('Aperte espaço para vencer!', width / 2 - 200, height / 2);
    }

    if (Math.random() < taxa) {
        obstacles.push(new Obstacle());
    }
    if (Math.random() < 0.01) {
        boosts.push(new Boost());
    }
    if (Math.random() < taxaD) {
        debufs.push(new debuf());
    }
    boosts.forEach((Boost) => {
        Boost.update();
        let dx = Boost.x - playerX;
        let dy = Boost.y - playerY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < playerSize / 2 + Boost.size / 2) {
            playerSpeed += bonus
            let index = boosts.indexOf(this);
            boosts.splice(index, 1);

        }
    });
    debufs.forEach((debuf) => {
        debuf.update();
        let dx = debuf.x - playerX;
        let dy = debuf.y - playerY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < playerSize / 2 + debuf.size / 2) {
            playerSpeed -= bonus
            let index = debufs.indexOf(this);
            debufs.splice(index, 1);

        }
    });
    obstacles.forEach((obstacle) => {
        obstacle.update();
        let dx = obstacle.x - playerX;
        let dy = obstacle.y - playerY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < playerSize / 2 + obstacle.size / 2) {
            location.reload();

        }
    });
}

document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Space' && cronometro >= dif) {
        win.style.display = "flex"
        restart.style.display = "flex"
        matrix.style.display = "none"
        document.getElementById("botoes").style.display = "flex"
        isPaused = true
        setInterval(function (){
            isPaused = false
        },5000)


    }
});
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        isPaused = !isPaused;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

function jogar(){
    update()
    contar()
    matrix.style.display = "flex"
    botton.style.display = "none"
    document.getElementById("botoes").style.display = "none"
}
function facil(){
    dif = 10
    speedobs = 5
    playerSpeed = 5
    dificuldades.style.display = "none";
    botton.style.display = "flex"
    taxa = 0.12
    bonus = 0.4
    taxaD = 0.02
}
function medio(){
    dif = 20
    speedobs = 7
    playerSpeed = 6
    dificuldades.style.display = "none"
    botton.style.display = "flex"
    bonus = 0.5
    taxaD = 0.02
    taxa = 0.03

}
function dificil(){
    dif = 30
    speedobs = 9
    playerSpeed = 7
    dificuldades.style.display = "none"
    botton.style.display = "flex"
    taxa = 0.05
    bonus = 0.6
    taxaD = 0.04
}
function infinito(){
    dif = 999999999
    speedobs = 7
    playerSpeed = 6
    dificuldades.style.display = "none"
    botton.style.display = "flex"
    taxa = 0.05
    bonus = 0.4
    taxaD = 0.01
}
function reiniciar(){
    location.reload()
}
document.addEventListener("keydown", function(event) {
    if (event.key === "1" && cronometro<0.01) {
        document.getElementById("facil").click();
    }
})
document.addEventListener("keydown", function(event) {
    if (event.key === "2"&& cronometro<0.01 ) {
        document.getElementById("medio").click();
    }
})
document.addEventListener("keydown", function(event) {
    if (event.key === "3" && cronometro<0.01 ) {
        document.getElementById("dificil").click();
    }
})
document.addEventListener("keydown", function(event) {
    if (event.key === "4" && cronometro<0.01 ) {
        document.getElementById("infinito").click();
    }
})
document.addEventListener("keydown", function(event) {
    if (event.key === "5" && cronometro<0.01 && botton.style.display === "flex" || event.key === "Enter"  && cronometro<0.01 && botton.style.display === "flex"|| event.key === " " && cronometro<0.01 && botton.style.display === "flex") {
        document.getElementById("jogar").click();
    }
})
document.addEventListener("keydown", function(event) {
    if (event.key === "r" && isPaused == true) {
        reiniciar()

    }
})
