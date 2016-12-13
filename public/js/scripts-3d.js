var width = window.innerWidth;
var height = window.innerHeight;
var clock = new THREE.Clock();

var pCount = 4000;

var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(width, height);
$('body').append(renderer.domElement);
 
 // SCENE SETUP
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2("black", 0.005);

// CAMERA SETUP
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 60;
camera.position.z = 200;
scene.add(camera);

renderer.render(scene, camera);

var particles = new THREE.Geometry();

for (var p = 0; p < pCount; p++) {
	var particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250);
	particle.velocity = new THREE.Vector3(0, -Math.random(), 0);
	particles.vertices.push(particle);
}

var particleMaterial = new THREE.PointsMaterial({ color: 0xeeeeee, size: 1 });
var particleSystem = new THREE.Points(particles, particleMaterial);

particleSystem.position.y = 400;

scene.add(particleSystem);

var GeoMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    wireframeLinewidth: 0.1,
    opacity: 1,
    transparent: true
});

var Geo = new THREE.IcosahedronGeometry(Math.random()*7, 0);
var GeoParticles = [];

for (p = 0; p < 150; p++) {
    var particle = new THREE.Mesh(Geo,GeoMaterial);
    particle.position.set(Math.random()*400-250,Math.random()*400-250,Math.random()*900-100);
    particle.rotation.y = Math.random() * 360;
    scene.add(particle);
    GeoParticles.push(particle);
}

console.log(scene);

function evolveGeo(d) {
    var sp = GeoParticles.length;
    while (sp--) {
        GeoParticles[sp].rotation.y += (d * 3);
        GeoParticles[sp].position.z += (d * 30);
        if (GeoParticles[sp].position.z >= 800) {
            GeoParticles[sp].position.z = -200;
        }
    }
}

function animate() {

    var delta = clock.getDelta();

    requestAnimationFrame(animate);

    if (particleSystem.position.y <= -380 && scene.children[1].type == "Points") {
        particleSystem.position.y = 400;
    } else {
        particleSystem.rotation.y += delta/6;
        particleSystem.position.y -= delta*20;
    }

    evolveGeo(delta);
    render();
}


function render() {
    renderer.render(scene, camera);
}

animate();
