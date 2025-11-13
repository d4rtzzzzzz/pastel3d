// Escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiental
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Controles de cámara
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 3;

// Cargar modelo GLB
const loader = new THREE.GLTFLoader();
loader.load(
  "pastel.glb",
  (gltf) => {
    document.getElementById("loading").remove();
    const model = gltf.scene;
    model.position.set(0, -1, 0);
    scene.add(model);
    animate();
  },
  (xhr) => {
    const percent = (xhr.loaded / xhr.total) * 100;
    document.getElementById("loading").textContent = `Cargando pastel... ${percent.toFixed(0)}%`;
  },
  (error) => {
    console.error("Error al cargar el pastel:", error);
  }
);

// Animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Ajustar tamaño al cambiar ventana
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
