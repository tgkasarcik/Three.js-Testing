import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { FlakesTexture } from 'three/examples/jsm/Addons.js';

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
window.addEventListener( 'resize', onWindowResize );

const normalMap3 = new THREE.CanvasTexture( new FlakesTexture() );
normalMap3.wrapS = THREE.RepeatWrapping;
normalMap3.wrapT = THREE.RepeatWrapping;
normalMap3.repeat.x = 10;
normalMap3.repeat.y = 6;
normalMap3.anisotropy = 16;

const torusGeo = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshPhysicalMaterial( { 
	clearcoat: 1.0,
	clearcoatRoughness: 0.1,
	metalness: 0.9,
	roughness: 0.5,
	color: 0x6f42f5,
	normalMap: normalMap3,
	normalScale: new THREE.Vector2( 0.15, 0.15 )
} );
material.shininess = 100;
const torus = new THREE.Mesh( torusGeo, material );
scene.add( torus );

const bgSphereGeo = new THREE.SphereGeometry(100, 32, 32);
const bgSphereTex = textureLoader.load('/test.jpg');
const bgSphereMat = new THREE.MeshPhongMaterial({map: bgSphereTex, side: THREE.BackSide});
const bgSphereMesh = new THREE.Mesh(bgSphereGeo, bgSphereMat);
//scene.add(bgSphereMesh);



const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

const pointLight = new THREE.PointLight(0x00ff00);
pointLight.position.set(20, 5, 5);
// scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

let particleLight = new THREE.Mesh(
	new THREE.SphereGeometry( .05, 8, 8 ),
	new THREE.MeshBasicMaterial( { color: 0xffffff } )
);
scene.add( particleLight );

particleLight.add( new THREE.PointLight( 0xffffff, 30 ) );

const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);


function update() {

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;

	const timer = Date.now() * 0.00025;

	particleLight.position.x = Math.sin( timer * 7 ) * 12;
	particleLight.position.y = Math.cos( timer * 5 ) * 16;
	particleLight.position.z = Math.cos( timer * 3 ) * 12;

	controls.update();

	draw();
}

function draw() {
	renderer.render( scene, camera );
}

function onWindowResize() {

	const width = window.innerWidth;
	const height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize( width, height );

}