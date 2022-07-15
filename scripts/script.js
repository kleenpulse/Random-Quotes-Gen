
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
    var scene = new THREE.Scene();
    document.addEventListener('mousemove', onMouseMove, false);
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var mouseX;
    var mouseY;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    var distance = Math.min(1400, window.innerWidth / 6);
    var geometry = new THREE.Geometry();

    for (var i = 0; i < 1600; i++) {

        var vertex = new THREE.Vector3();

        var theta = Math.acos(THREE.Math.randFloatSpread(2));
        var phi = THREE.Math.randFloatSpread(7);

        vertex.x = distance * Math.sin(theta) * Math.cos(phi);
        vertex.y = distance * Math.sin(theta) * Math.sin(phi);
        vertex.z = distance * Math.cos(theta);

        geometry.vertices.push(vertex);
    }
    var particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xffffff, size: .2 }));
    particles.boundingSphere = 1;


    var renderingParent = new THREE.Group();
    renderingParent.add(particles);

    var resizeContainer = new THREE.Group();
    resizeContainer.add(renderingParent);
    scene.add(resizeContainer);

    camera.position.z = 500;

    var animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    var myTween;
    function onMouseMove(event) {
        if (myTween)
            myTween.kill();

        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
        myTween = gsap.to(particles.rotation, { duration: 0.1, x: mouseY * -1, y: mouseX });
        //particles.rotation.x = mouseY*-1;
        //particles.rotation.y = mouseX;
    }
    animate();

    // Scaling animation
    var animProps = { scale: 1.7, xRot: 0, yRot: 0 };
    gsap.to(animProps, {
        duration: 15, scale: 1.9, repeat: -1, yoyo: true, ease: "sine", onUpdate: function () {
            renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
        }
    });

    gsap.to(animProps, {
        duration: 200, xRot: Math.PI * 2, yRot: Math.PI * 4, repeat: -1, yoyo: true, ease: "none", onUpdate: function () {
            renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
        }
    });
}