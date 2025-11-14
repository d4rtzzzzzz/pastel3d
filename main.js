// IMPORTAR THREE DESDE CDN
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Fondo blanco

// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 2, 3); // Cámara fuera del pastel

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 2;
controls.maxDistance = 10;

// Luces
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(3, 10, 5);
scene.add(dirLight);

// Cargar modelo
const loader = new GLTFLoader();
loader.load(
  "pastel.glb",
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5); // Aumentar tamaño
    model.position.set(0, -1, 0);
    scene.add(model);
  },
  undefined,
  (err) => console.error(err)
);

// Animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Ajustar tamaño
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
