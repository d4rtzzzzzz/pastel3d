import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Cámara (arreglada)
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,   // ¡súper pequeño para que no desaparezca!
  2000    // súper grande para modelos gigantes
);

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 3);
dir.position.set(5, 10, 5);
scene.add(dir);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Cargar modelo
const loader = new GLTFLoader();
loader.load(
  "pastel.glb",
  (gltf) => {
    const model = gltf.scene;

    // ⭐ LIMPIAR PANELES INTERNOS DE SKETCHFAB
    model.traverse((obj) => {
      if (obj.isMesh && obj.material && obj.material.name.includes("Light")) {
        obj.visible = false;
      }
      if (obj.isMesh && obj.material && obj.material.transparent) {
        obj.material.opacity = 1;
      }
    });

    // ⭐ ESCALA AUTOMÁTICA
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const scaleFactor = 5 / size; // ajusta tamaño a algo normal
    model.scale.setScalar(scaleFactor);

    // ⭐ CENTRAR
    box.setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    scene.add(model);

    // Cámara ajustada al tamaño del pastel
    camera.position.set(2, 2, 5);

    document.getElementById("loading")?.remove();

    animate();
  }
);

// Loop de animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
