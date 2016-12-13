var camera, scene, renderer;
var renderTargetDots, dotsComposer, dotMatrixPass;
var hblurPass, vblurPass, blendPass;

var width = window.innerWidth;
var height = window.innerHeight;

function init() {

	console.log("initialization started!");

	renderer = new THREE.WebGLRenderer({});
	renderer.setSize(width, height);
	$('body').append(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(55, width / height, 20, 3000);
	// camera.position.y = 60;
	camera.position.z = 1000;
	scene.add(camera);

	// renderer.render(scene, camera);

	cubeHolder = new THREE.Object3D();

	scene.add(cubeHolder);

	console.log("initialization - creating blocks");

	// CREATING BLOCKS
	var geometry = new THREE.BoxGeometry(100, 100, 100);
	var spread = 2000;
	for (var i = 0; i < countHappy; i++) {

		var material1 = new THREE.MeshBasicMaterial({
			// opacity: Math.random(),
			color: 0x00FF00,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true,
			wireframe: true,
			wireframeLinewidth: 0.2
		});

		var cube1 = new THREE.Mesh(geometry, material1);
		cube1.scale.x = cube1.scale.y = cube1.scale.z = Math.random() * 3 + 0.05;
		cube1.position.x = Math.random() * spread - spread/2;
		cube1.position.y = Math.random() * spread - spread/2;
		cube1.position.z = Math.random() * spread - spread/2;

		cubeHolder.add(cube1);
	}

	for (var j = 0; j < countSad; j++) {

		var material2 = new THREE.MeshBasicMaterial({
			color: 0xFF0000,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true,
			wireframe: true,
			wireframeLinewidth: 0.2
		});

		var cube2 = new THREE.Mesh(geometry, material2);
		cube2.scale.x = cube2.scale.y = cube2.scale.z = Math.random() * 3 + 0.05;
		cube2.position.x = Math.random() * spread - spread/2;
		cube2.position.y = Math.random() * spread - spread/2;
		cube2.position.z = Math.random() * spread - spread/2;

		cubeHolder.add(cube2);
	}

	console.log(cubeHolder);
	console.log(scene);

	console.log("initialization - postprocessing!");



	// POST-PROCESSING

	var renderTargetParameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat,
		stencilBuffer: false
	};
	var renderPass = new THREE.RenderPass(scene, camera);
	dotMatrixPass = new THREE.ShaderPass(THREE.DotMatrixShader);
	hblurPass = new THREE.ShaderPass(THREE.HorizontalBlurShader);
	vblurPass = new THREE.ShaderPass(THREE.VerticalBlurShader);

	renderTarget = new THREE.WebGLRenderTarget(width, height, renderTargetParameters);

	dotsComposer = new THREE.EffectComposer(renderer, renderTarget);
	dotsComposer.addPass(renderPass);
	dotsComposer.addPass(dotMatrixPass);

	glowComposer = new THREE.EffectComposer(renderer, renderTarget);
	glowComposer.addPass(renderPass);
	glowComposer.addPass(dotMatrixPass);
	glowComposer.addPass(hblurPass);
	glowComposer.addPass(vblurPass);

	hblurPass.uniforms['h'].value = 0.4 / width*3;
	vblurPass.uniforms['v'].value = 0.4 / height*3;

	dotMatrixPass.uniforms["spacing"].value = 12.0;
	dotMatrixPass.uniforms["size"].value = Math.pow(0.2, 2);
	dotMatrixPass.uniforms["blur"].value = Math.pow(3.0*2, 2);
	dotMatrixPass.uniforms["resolution"].value = new THREE.Vector2(window.innerWidth,window.innerHeight);

	blendPass = new THREE.ShaderPass(THREE.AdditiveBlendShader);
	blendPass.uniforms['tBase'].value = dotsComposer.renderTarget1;
	blendPass.uniforms['tAdd'].value = glowComposer.renderTarget1;
	blendPass.uniforms['amount'].value = 2.0;

	blendComposer = new THREE.EffectComposer(renderer, renderTarget);
	blendComposer.addPass(blendPass);
	blendPass.renderToScreen = true;
}

// $('.container-fluid').append(renderer.domElement);

function animate() {

	cubeHolder.rotation.y -= 0.01;
	cubeHolder.rotation.x += 0.01;

	dotsComposer.render();
	glowComposer.render();
	blendComposer.render();

	requestAnimationFrame(animate);
}

