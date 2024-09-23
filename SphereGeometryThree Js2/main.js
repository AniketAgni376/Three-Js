import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1,10,21); 
const material = new THREE.MeshBasicMaterial({ color: 0x0033FFFF, wireframe:true});
const cube = new THREE.Mesh(geometry,material);


// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Configure OrbitControls
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = true;


scene.add(cube);

// Add event listener for window resize

window.addEventListener('resize', onWindowResize, false);

// Function to handle window resize
function onWindowResize() {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}


// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate cube
    // cube.rotation.x += 0.003;
    cube.rotation.y += 0.01;
    // cube.rotation.z += 0.02;
    controls.update();
    renderer.render(scene, camera);
}

animate();
