document.addEventListener('DOMContentLoaded', ()=>{


    let plan3D = document.getElementById('plan3D')
    let cubesARR = document.getElementsByClassName('cube')


    document.querySelector('#un .top').addEventListener('click', ()=>{
        // document.getElementById('visit').remove()
        plan3D.classList.add('start')

        setTimeout(()=>{
            plan3D.classList.add('rotate')

            cubesARR[0].classList.add('selectedCube')
            let previousCube = 0

            for(let i = 0; i < cubesARR.length; i++){
                cubesARR[i].addEventListener('click', ()=>{
                    cubesARR[previousCube].classList.remove('selectedCube')
                    cubesARR[i].classList.add('selectedCube')
                    console.log((i * 10 + 20) + 'svw')
                    document.getElementById('plan3D').style.top = ((i * 10 - 10) * -1) + 'svw'
                    previousCube = i
                })
            }

        }, 3000)
    })

})