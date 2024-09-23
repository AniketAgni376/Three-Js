import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x0033FFFF, wireframe:true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const controls =  new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableDamping = true;
// controls.enableZoom = false;
controls.dampingFactor = 0.01;
function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
	renderer.render( scene, camera );

    
}
 animate();

