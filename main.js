import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#canvas')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );	// Make renderer fullscreen
renderer.setAnimationLoop( update );

const textureLoader = new THREE.TextureLoader();

const controls = new OrbitControls(camera, renderer.domElement);

const torusGeo = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const torus = new THREE.Mesh( torusGeo, material );
scene.add( torus );

const bgSphereGeo = new THREE.SphereGeometry(100, 32, 32);
const bgSphereTex = textureLoader.load('/test.jpg');
const bgSphereMat = new THREE.MeshBasicMaterial({map: bgSphereTex, side: THREE.BackSide});
const bgSphereMesh = new THREE.Mesh(bgSphereGeo, bgSphereMat);
scene.add(bgSphereMesh);



const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

const pointLight = new THREE.PointLight(0x00ff00);
pointLight.position.set(20, 5, 5);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);


function update() {

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;

	controls.update();

	draw();
}

function draw() {
	renderer.render( scene, camera );
}