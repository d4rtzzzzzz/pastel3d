import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Cámara (super corregida)
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.0001,    // near MUY pequeño para evitar cortes
  10000       // far muy grande para soportar modelos enormes
);
camera.position.set(2, 2, 5);

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 2));
const dir = new THREE.DirectionalLight(0xffffff, 3);
dir.position.set(5, 10, 5);
scene.add(dir);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 0.1;
controls.maxDistance = 50;

// Cargar pastel
const loader = new GLTFLoader();
loader.load(
  "pastel.glb",
  (gltf) => {
    const model = gltf.scene;

    // ⭐ ESCALA EXTREMA (porque tu pastel es gigante)
    model.scale.set(0.001, 0.001, 0.001);

    // ⭐ Centrar modelo
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    // ⭐ Quitar cosas internas de Sketchfab (paneles, luces falsas, rectángulos)
    model.traverse((obj) => {
      if (obj.isMesh) {
        if (obj.material && obj.material.name.includes("Light")) {
          obj.visible = false;
        }
        obj.material.transparent = false;
        obj.material.depthWrite = true;
      }
    });

    scene.add(model);

    document.getElementById("loading")?.remove();
    animate();
  },
  undefined,
  (err) => console.error(err)
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
