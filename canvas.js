var canvas = document.getElementById('canvas')
var cvs = canvas.getContext("2d")

var score = document.querySelector('.score-num')
var bestScore = document.querySelector('.best-score-num')


var fail = new Audio("https://www.dropbox.com/s/r7o9las1ki6tr0u/fail.wav?dl=1")
var eat = new Audio("https://www.dropbox.com/s/qukhjmxog6h3we8/crunch.wav?dl=1")

var posX = posY = 10
var appleX = appleY = 0
var vcityX = vcityY = 0
var snakeSize = 4
var snake = []
var timer 
var fps = 15

// Ekranda Ok tuşlarına baştığında hareket edecektir
document.addEventListener('keydown', key)

function init() {
    posX = posY = 10
    appleX = appleY = 0
    vcityX = 0, vcityY = vcityX
    snakeSize = 4
    snake = []

    // Saniyede 15 kere ekrana yazdır
    timer = setInterval(() => {
        loop()
    }, 1000/fps)
}

function reset() {
    fail.play()
    clearInterval(timer)
    init()
}

function loop() {
    // Yüklemeleri kontrol et
    update()
    // Çizimleri yap
    draw()
}

function update() {
    posX += vcityX
    posY += vcityY

    // sağdan girip soldan çıkması ve tersi için
    if(posX < 0){
        posX = 19
    } else if(posY < 0){
        posY = 19
    } else if(posX > 19){
        posX = 0
    } else if(posY > 19){
        posY = 0
    }

    if(snake.length > 4){
        // Yılan kendi üstüne çarptığı zaman sıfırla
        snake.forEach(t => {
            if (this.posX == t.posX && this.posY == t.posY) {
                reset()
                checkScore()
            }
        });
    }
    
    snake.push({posX: this.posX, posY: this.posY})

    // Her seferinde elmayı scora göre ayarla
    while(snake.length > snakeSize){
        snake.shift()
    }
    
    // Elmayı yediği zaman
    if(appleX === posX && appleY === posY){
        eatApple()
    }
}
function eatApple(){
    eat.play()

    snakeSize++
    score.innerHTML = parseInt(snakeSize - 4)

    checkApple()
}
function checkScore(){
    // Eğer skor bir öncekinden büyükse en iyi skora ekle değilse ekleme
    if(snakeSize > parseInt(bestScore.innerHTML)){
        bestScore.innerHTML = snakeSize - 4
    }
}

function checkApple() {
    // Her elmayı yediğinde random bir kordinat belirleyelim
    appleX = Math.floor(Math.random() * 20)
    appleY = Math.floor(Math.random() * 20)
    // Elma Yılanın üstünde doğarsa tekrar fonksiyonu çalıştır
    snake.forEach(s => {
        if(appleX === s.posX && appleY === s.posY){
            checkApple()
        }   
    })
}

function draw() {
    // Alanı çizelim
    cvs.fillStyle = "#D5F2FB"
    cvs.fillRect(0, 0, canvas.width, canvas.height)

    // Elmayı Çizelim
    cvs.fillStyle = "#C4C4C4"
    cvs.fillRect(appleX * 20, appleY * 20, 20 - 3, 20 - 3)

    // Yılanın her bir karesini ekrana yazdıralım
    cvs.strokeStyle = "#DA3838"
    snake.forEach(s => {
        cvs.strokeRect(s.posX * 20, s.posY * 20, 20 - 3, 20 - 3)
    })

    // Yılanın başını farketmek için farklı birşey yapalım
    snakeHead()
	
}
function snakeHead(){
    var headIndex = snake.length-1
	//Başın daha belirgin olması için rengini değiştirdim
    cvs.beginPath()
    cvs.moveTo(200, 200, 0, 0)
    cvs.lineTo(200, 200, 10, 100)
    cvs.lineWidth = 3
    cvs.stroke()

    cvs.fillStyle = "orange"
    cvs.fillRect(snake[headIndex].posX * 20 -2, snake[headIndex].posY * 20 -2, 20, 20)
	
}

function key(key) {
    if(key.keyCode === 38 && vcityY != 1){
        vcityX = 0
        vcityY = -1
    } else if(key.keyCode === 37 && vcityX != 1){
        vcityX = -1
        vcityY = 0
    } else if(key.keyCode == 39 && vcityX != -1){
        vcityX = 1
        vcityY = 0
    } if(key.keyCode === 40 && vcityY != -1){
        vcityX = 0
        vcityY = 1
    }
}


window.onload = () => init()




 
