var videoARR = ['']


document.addEventListener('DOMContentLoaded', () => {


    let plan3D = document.getElementById('plan3D')
    let cubesARR = document.getElementsByClassName('cube')


    document.querySelector('#un .top').addEventListener('click', () => {
        document.getElementById('visit').remove()
        plan3D.classList.add('start')

        setTimeout(() => {
            plan3D.classList.add('rotate')
            let previousCube = 8
            let newCube = 0

            let time = 0
            var interval = window.setInterval(() => {
                if (time++ == 4) { clearInterval(interval) }
                if (newCube != previousCube) {
                    cubesARR[previousCube].classList.remove('selectedCube')
                    cubesARR[newCube].classList.add('selectedCube')
                    previousCube = newCube

                    createVideo(document.querySelector(".selectedCube ." + timeToSide(time-1)))
                } else {
                    cubesARR[previousCube].classList.remove('selectedCube')
                    setTimeout(() => { cubesARR[previousCube].classList.add('selectedCube') }, 0.1)
                }
            }, 5000)
            plan3D.addEventListener('animationend', () => {
                plan3D.classList.remove('rotate')
                setTimeout(() => { plan3D.classList.add('rotate') }, 0.1)

                let time = 0
                var interval = window.setInterval(() => {
                    if (time++ == 4) { clearInterval(interval) }
                    if (newCube != previousCube) {
                        cubesARR[previousCube].classList.remove('selectedCube')
                        cubesARR[newCube].classList.add('selectedCube')
                        previousCube = newCube

                        createVideo(document.querySelector(".selectedCube ." + timeToSide(time-1)))
                    }
                }, 5000)
            })

            for (let i = 0; i < cubesARR.length; i++) {
                cubesARR[i].addEventListener('click', () => {
                    newCube = i
                    document.getElementById('plan3D').style.top = ((i * 10 - 10) * -1) + 'svw'
                })
            }
        }, 3000)
    })

})

function createVideo(dom){
    let index = dom.parentElement.getAttribute('pos')
}

function timeToSide(time) {
    switch (time) {
        case 1:
            return 'back'
        case 2:
            return 'left'
        case 3:
            return 'front'
        default:
            return 'right'
    }
}
