
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
        if (document.getElementsByClassName('video')[0] != null) {
            Array.from(document.getElementsByClassName('video')).forEach((e) => {
                e.remove()
            })
        }

        Array.from(dom.children).forEach((e) => {
            if (e.classList.contains('top') || e.classList.contains('bottom')) { } else {
                let video = document.createElement('video')
                video.classList.add('video')
                video.muted = true
                video.alt = 'A video of this ' + this.name + ' project. If it doesn\'t load, pls refresh the page'
                video.src = this.path
                video.controls = true
                video.autoplay = true
                video.loop = true
                e.appendChild(video)
                // console.log(video)
            }
        })

        this.load()
    }
}


var videoARR = [
    new video('minesweeper', 'This is my first website, i did it to learn all the basics. <br>It is a minesweeper game done in particular using the websocket for the fastest players. <br>This project is accessible via minesweeper.fr', ['JS', 'PHP', 'MYSQL', 'CSS']),
    new video('fenetreS', 'This is a little project done just to see if it was possible. <br>It was fun to do and the effect is really cool. <br>It could be useful sometime later !', ['JS', 'CSS']),
    new video('Paragraph', 'This one was a fun project I did in my second month of learning to code. <br>It is a shooting game with RogueLikes mechanics. <br>I wanted to see what was possible with the little knowledge I had at the time. It helped me improve my animation skills a lot and I learned a lot about algorithmic logic. <br>There is multiples rooms, multiples weapons, multiples ennemis and multiples level ups rewards offerings uniques games', ['JS', 'CSS']),
    new video('textMaker', 'This project is my first job ! <br>It was made for a graphist that was in need of a webapp where she could easily use a font and give a link to her customers so that they could use it for their graphisms projects. I massively used GD image', ['PHP', 'JS', 'CSS']),
    new video('Pokemon', 'This project is a little try to improve the Paragraph previsous project. <br>I maded a pokemon like game to learn about hitbox and to use MYSQL in a fun way. <br>In this microGame you can have various pokemon and start fighting scenes. You also have acces to multiples maps.', ['CSS', 'JS']),
    new video('3Dcity', 'This was my first project using 3D in CSS. i can\'t call this one beautiful but i teached me a lot', ['CSS']),
    new video('', '', []),
    new video('', '', []),
    new video('', '', []),
    new video('', '', []),
]
var portfolio = new video('Portfolio', 'I Wanted to use this Portofolio as an excuse to show something interesting. <br>So i made my portfolio using Vanilla CSS perspective and some vanilla JS to cycle between the projets. You can see all my projects by clicking on the cubes. Don\'t hesitate to see the videos in fullscreen !', ['CSS'])



document.addEventListener('DOMContentLoaded', () => {

    let color = ['red', 'blue', 'pink', 'purple', 'green', 'orange', 'yellow']

    let plan3D = document.getElementById('plan3D')
    let cubesARR = document.getElementsByClassName('cube')

    Array.from(cubesARR).forEach((e) => {
        let randColor = color[Math.floor(Math.random() * color.length)]
        Array.from(e.children).forEach((j) => {
            j.style.background = randColor
        })
    })

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
            nuages()
            var interval = window.setInterval(() => {
                if (time++ == 4) { clearInterval(interval) }
                if (newCube != previousCube) {
                    cubesARR[previousCube].classList.remove('selectedCube')
                    cubesARR[newCube].classList.add('selectedCube')
                    previousCube = newCube

                    videoARR[newCube].video(document.querySelector(".selectedCube"))
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

                        videoARR[newCube].video(document.querySelector(".selectedCube"))
                    }
                }, 5000)
            })

            for (let i = 0; i < cubesARR.length; i++) {
                cubesARR[i].addEventListener('click', () => {
                    if (!clickable) { return }
                    clickable = false
                    newCube = i
                    document.getElementById('plan3D').style.top = ((i * 10 - 15) * -1) + 'svw'
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

function nuages() {
    let img = 'img/cloud' + (Math.floor(Math.random() * 4 + 1)) + '.png'
    let size = (Math.floor(Math.random() * (5 - 2 + 1) + 2)) + 'svw'
    let Y = (Math.floor(Math.random() * (95 - 1 + 1) + 1)) + 'svh'
    let nuage = document.createElement('img')
    nuage.src = img
    document.body.appendChild(nuage)
    nuage.style.top = Y
    nuage.style.height = size
    nuage.classList.add('nuage')

    setTimeout(() => { nuage.remove() }, 30000)
}
