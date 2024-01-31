// Import Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

// Initialize Three.js scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0, 0, 500);

const light = new THREE.PointLight(0xffffff, 100000, 1000);
scene.add(light);
light.position.set(200, 300, 200);

const light2 = new THREE.PointLight(0xffffff, 100000, 1000);
scene.add(light2);
light2.position.set(-200, 300, -200);

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const params = {
  plankLength: 300,
  plankHeight: 10,
  plankDepth: 2,
  gap: 2.5,
  numPlanks: 10,
  groundSize: 10000, // Adjust ground size as needed
  skyboxSize: 5000, // Adjust skybox size as needed
};

// Create planks with gap
for (let i = 0; i < params.numPlanks; i++) {
  const geometry = new THREE.BoxGeometry(params.plankLength, params.plankHeight, params.plankDepth);
  const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
  const plank = new THREE.Mesh(geometry, material);

  plank.position.y = i * (params.plankHeight + params.gap);
  scene.add(plank);
}

// Create ground
const groundGeometry = new THREE.BoxGeometry(params.groundSize, 1, params.groundSize);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -(params.plankHeight + params.gap) * params.numPlanks / 2; // Adjust position based on the size of the ground
scene.add(ground);

// Create skybox
const skyboxGeometry = new THREE.BoxGeometry(params.skyboxSize, params.skyboxSize, params.skyboxSize);
const skyboxMaterial = new THREE.MeshBasicMaterial({
  color: 0x87CEEB, // Adjust sky color as needed
  side: THREE.BackSide,
});
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
