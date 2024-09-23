import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from 'lil-gui';
// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// // ------------------------------------------------------------------------



// const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2);
// highIntensityLight.position.set(10,20,15);
// scene.add(highIntensityLight);



// // Add studio lighting

// // Create a directional light (key light)
// const keyLight = new THREE.DirectionalLight(0xffffff, 1);
// keyLight.position.set(5, 5, 5);
// scene.add(keyLight);

// // Create a softer fill light
// const fillLight = new THREE.PointLight(0xffffff, 1);
// fillLight.position.set(5,10,7.5);
// scene.add(fillLight);

// // Add ambient light for overall illumination
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// // Optional: Add a back light for rim lighting effect
// const backLight = new THREE.DirectionalLight(0xffffff, 13);
// backLight.position.set(0, 5, 0);
// scene.add(backLight);

// // ------------------------------------------------------------------------


let ambient = new THREE.AmbientLight(0xffffff , 3);
scene.add(ambient);

let directional = new THREE.DirectionalLight(0xffffff, 3);
directional.position.set(2, 2, 2);
scene.add(directional);

const helper = new THREE.DirectionalLightHelper( directional, 2 );
scene.add( helper );

let point = new THREE.PointLight(0xffffff, 1, 10,2);
point.position.set(.3, -1.3, 1);
scene.add(point);


const pointLightHelper = new THREE.PointLightHelper( point, 1 );
scene.add( pointLightHelper );


let loader =  new THREE.TextureLoader();
let color = loader.load("./text/color.jpg");
let roughness = loader.load("./text/roughness.jpg");
let normal = loader.load("./text/normal.png");
let height = loader.load("./text/height.png"); 

const geometry = new THREE.BoxGeometry(3, 1.8 ,2); 
const material = new THREE.MeshStandardMaterial({map: color, roughnessMap: roughness, normalMap:normal });
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


// Create GUI
const gui = new lil.GUI();

// GUI for lights
const lightsFolder = gui.addFolder('Lights');

// Ambient Light
const ambientFolder = lightsFolder.addFolder('Ambient Light');
ambientFolder.add(ambient, 'intensity', 0, 5).name('Intensity');
ambientFolder.addColor(ambient, 'color').name('Color');

// Directional Light
const directionalFolder = lightsFolder.addFolder('Directional Light');
directionalFolder.add(directional, 'intensity', 0, 5).name('Intensity');
directionalFolder.addColor(directional, 'color').name('Color');
directionalFolder.add(directional.position, 'x', -5, 5).name('Position X');
directionalFolder.add(directional.position, 'y', -5, 5).name('Position Y');
directionalFolder.add(directional.position, 'z', -5, 5).name('Position Z');

// Point Light
const pointFolder = lightsFolder.addFolder('Point Light');
pointFolder.add(point, 'intensity', 0, 5).name('Intensity');
pointFolder.addColor(point, 'color').name('Color');
pointFolder.add(point.position, 'x', -5, 5).name('Position X');
pointFolder.add(point.position, 'y', -5, 5).name('Position Y');
pointFolder.add(point.position, 'z', -5, 5).name('Position Z');
pointFolder.add(point, 'distance', 0, 20).name('Distance');
pointFolder.add(point, 'decay', 0, 5).name('Decay');

// Update light helpers when values change
lightsFolder.onChange(() => {
    helper.update();
    pointLightHelper.update();
});



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
    // cube.rotation.x += 0.00103;
    // cube.rotation.y += 0.002;    
    // cube.rotation.z += 0.001021;
    controls.update();
    renderer.render(scene, camera);
}

animate();
















