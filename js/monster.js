const player = document.querySelector('.player')
const enmy = document.querySelector('.enmy')
const scoreEl = document.querySelector('.score')

let x = window.innerWidth
let gameSpeed = 5
let count = 0
let isJumping = false


player.style.bottom = '4.5%'

// прыжок
document.addEventListener('keydown', e => {
    if (e.code === 'Space' && !isJumping) {
        isJumping = true
        player.style.bottom = '60%'
        setTimeout(() => {
            player.style.bottom = '4.5%'
            setTimeout(() => {
                isJumping = false
            }, 300)
        }, 500)
    }
})


function run() {
    let playerX = player.getBoundingClientRect()
    let enmyX = enmy.getBoundingClientRect()
    x -= gameSpeed
    count++

    if (x < -60) {
        x = window.innerWidth
    }

    enmy.style.left = `${x}px`
    scoreEl.innerText = `Score: ${Math.floor(count / 50)}`

    // проверка столкновения
    if (
        enmyX.left < playerX.right &&
        enmyX.right > playerX.left &&
        enmyX.bottom > playerX.top &&
        enmyX.top < playerX.bottom
    ) {
        alert(`Game Over! Your score is ${Math.floor(count / 50)}`)
        x = window.innerWidth
        count = 0
    }

    requestAnimationFrame(run)
}

run()

