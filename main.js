import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, controls;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Cámara centrada y a una distancia correcta
  camera.position.set(0, 1.5, 4);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Luz ambiental potente
  const amb = new THREE.AmbientLight(0xffffff, 2.2);
  scene.add(amb);

  // Luz direccional desde arriba
  const dir = new THREE.DirectionalLight(0xffffff, 2);
  dir.position.set(4, 6, 4);
  scene.add(dir);

  // Controles
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Cargar tu pastel.glb
  const loader = new GLTFLoader();
  loader.load(
    "./pastel.glb",
    (gltf) => {
      document.getElementById("loading").remove();
      const model = gltf.scene;

      // Ajuste de posición
      model.position.set(0, -0.5, 0);

      // Evita que desaparezca al hacer zoom
      model.traverse((child) => {
        if (child.isMesh) {
          child.frustumCulled = false;
        }
      });

      scene.add(model);
      animate();
    }
  );

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

init();
