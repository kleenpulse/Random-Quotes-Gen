
quotes.sort(() => 0.5 - Math.random())

let qouteDisplay = document.querySelector('#quote')
let authorDisplay = document.querySelector('#author')
let quotesArr = []
let getQuote
let quoteIds = []

quotes.forEach(quote => {
    quote.ids = quotes.indexOf(quote) + 1
    quotesArr.push(quote)

})
let clickBtn = document.querySelector('button')

function getSoundNQuote(){
    updateQuote()
    playSound()
    clickBtn.disabled = true
    clickBtn.style.opacity = '.3'
    clickBtn.style.cursor = 'not-allowed'

    setTimeout(() => {
        clickBtn.disabled = false
        clickBtn.style.opacity = '1'
        clickBtn.style.cursor = 'pointer'
    }, 2000);
}


function updateQuote() {
    getQuote = quotesArr[Math.floor(Math.random() * quotesArr.length)]

    qouteDisplay.innerHTML = getQuote.quote
    authorDisplay.textContent = '-' + getQuote.author
    quoteIds.push(getQuote.ids)
    console.log(getQuote)

}

setInterval(() => {
    updateQuote()
}, 300000);



const callUpdateQuoteOnce = () => {
    var executed = false;

    if (!executed) {
        executed = true;
        updateQuote()
    }

};
callUpdateQuoteOnce()

let sound = document.querySelector('audio')

function playSound(){
    sound.play()
    sound.loop = false
}


// ===========GSAP============
{
    // examples
    // https://threejs.org/examples/?q=particle#webgl_points_billboards

    let camera
    let scene
    let renderer
    let material
    let mouseX = 0
    let mouseY = 0
    let windowHalfX = window.innerWidth / 2
    let windowHalfY = window.innerHeight / 2

    init()
    animate()

    function init() {
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 2000)
        camera.position.z = 500

        scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x0000ff, 0.001)

        const geometry = new THREE.BufferGeometry()
        const vertices = []
        const size = 2000

        for (let i = 0; i < 20000; i++) {
            const x = (Math.random() * size + Math.random() * size) / 2 - size / 2
            const y = (Math.random() * size + Math.random() * size) / 2 - size / 2
            const z = (Math.random() * size + Math.random() * size) / 2 - size / 2

            vertices.push(x, y, z)
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

        material = new THREE.PointsMaterial({
            size: 2,
            color: 0xffffff,
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        renderer = new THREE.WebGLRenderer()
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        document.body.style.touchAction = 'none'
        document.body.addEventListener('pointermove', onPointerMove)
        window.addEventListener('resize', onWindowResize)
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2
        windowHalfY = window.innerHeight / 2

        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function onPointerMove(event) {
        mouseX = event.clientX - windowHalfX
        mouseY = event.clientY - windowHalfY
    }

    function animate() {
        requestAnimationFrame(animate)
        render()
    }

    function render() {
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02
        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        scene.rotation.x += 0.001
        scene.rotation.y += 0.002
    }

}