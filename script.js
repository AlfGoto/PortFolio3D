
let clickable = true


class video {
    constructor(name, explanation, languages) {
        this.name = name
        this.path = 'video/' + name + '.mp4'
        this.explanation = explanation
        this.languages = languages
    }
    load() {
        document.getElementById('ExplanationSection').innerHTML = ''
        let Explh1 = document.createElement('h1')
        let ExplP = document.createElement('p')
        Explh1.innerHTML = this.name
        ExplP.innerHTML = this.explanation
        document.getElementById('ExplanationSection').appendChild(Explh1)
        document.getElementById('ExplanationSection').appendChild(ExplP)

        let langages = document.getElementById('langages')
        langages.innerHTML = ''
        this.languages.forEach((e) => {
            let logo = document.createElement('img')
            langages.appendChild(logo)
            logo.src = 'logo/' + e + '.png'
        })
        clickable = true
    }
    video(dom) {
        if (document.getElementsByClassName('video')[0] != null) { document.getElementsByClassName('video')[0].remove() }

        let video = document.createElement('video')
        video.classList.add('video')
        video.muted = true
        video.controls = true
        video.autoplay = true
        video.loop = true
        dom.appendChild(video)
        video.src = this.path

        this.load()
    }
}


var videoARR = [
    new video('minesweeper', 'This is my first website, i did it to learn all the basics. It is a minesweeper game done in particular using the websocket for the fastest players. This project is accessible via minesweeper.fr', ['JS', 'PHP', 'MYSQL', 'CSS']),
    new video('fenetreS', 'This is a little project done just to see if it was possible. It was fun to do and the effect is really cool. It could be useful sometime later !', ['JS', 'CSS'])
]
var portfolio = new video('Portfolio', 'I Wanted to use this Portofolio as an excuse to show something interesting. So i made my portfolio using Vanilla CSS perspective and some JS to cycle between the projets. You can see all my projects by clicking on the cubes. Don\'t hesitate to see the videos in fullscreen !', ['CSS'])



document.addEventListener('DOMContentLoaded', () => {

    let plan3D = document.getElementById('plan3D')
    let cubesARR = document.getElementsByClassName('cube')

    portfolio.load()

    document.querySelector('#un .top').addEventListener('click', () => {
        document.getElementById('visit').remove()
        plan3D.classList.add('start')

        setTimeout(() => {
            plan3D.classList.add('rotate')
            let previousCube = 8
            let newCube = 8

            let time = 0
            newCube = 0
            var interval = window.setInterval(() => {
                nuages()
                if (time++ == 4) { clearInterval(interval) }
                if (newCube != previousCube) {
                    cubesARR[previousCube].classList.remove('selectedCube')
                    cubesARR[newCube].classList.add('selectedCube')
                    previousCube = newCube

                    videoARR[newCube].video(document.querySelector(".selectedCube ." + timeToSide(time - 1)))
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
                    nuages()
                    if (time++ == 4) { clearInterval(interval) }
                    if (newCube != previousCube) {
                        cubesARR[previousCube].classList.remove('selectedCube')
                        cubesARR[newCube].classList.add('selectedCube')
                        previousCube = newCube

                        videoARR[newCube].video(document.querySelector(".selectedCube ." + timeToSide(time - 1)))
                    }
                }, 5000)
            })

            for (let i = 0; i < cubesARR.length; i++) {
                cubesARR[i].addEventListener('click', () => {
                    if (!clickable) { return }
                    clickable = false
                    newCube = i
                    document.getElementById('plan3D').style.top = ((i * 10 - 10) * -1) + 'svw'
                })
            }
        }, 3000)
    })


    for (let i = 0; i < cubesARR.length; i++) {
        let cube = cubesARR[i]
        cube.addEventListener('mouseover', () => {
            if (cube.classList.contains('selectedCube')) { return }
            Array.from(cube.children).forEach((e) => {
                e.classList.add('borderAnimate')
            })
        })
        cube.addEventListener('mouseout', () => {
            // if (cube.classList.contains('selectedCube')) { return }
            Array.from(cube.children).forEach((e) => {
                e.classList.remove('borderAnimate')
            })
        })
    }

})


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
function nuages(){
    let img = 'img/cloud' + (Math.floor(Math.random() * 4 + 1)) + '.png'
    let size = (Math.floor(Math.random() * (5 - 2 + 1) + 2)) + 'svw'
    let Y = (Math.floor(Math.random() * (95 - 5 + 1) + 5)) + 'svh'
    let nuage = document.createElement('img')
    nuage.src = img
    document.body.appendChild(nuage)
    nuage.style.top = Y
    nuage.style.height = size
    nuage.classList.add('nuage')

    setTimeout(()=>{nuage.remove()}, 30000)
}
