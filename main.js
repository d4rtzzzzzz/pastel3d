// Escena, cámara y renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExposure = 1.8;
document.body.appendChild(renderer.domElement);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // luz ambiental intensa
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 1);
fillLight.position.set(-5, 5, -5);
scene.add(fillLight);

// Cargar modelo GLB
const loader = new THREE.GLTFLoader();
loader.load(
  "pastel.glb",
  (gltf) => {
    document.getElementById("loading")?.remove();
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.1, 0.1, 0.1);

    // Ajustar materiales para reflejar la luz correctamente
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.roughness = 0.3;
        child.material.metalness = 0.1;
        child.material.needsUpdate = true;
      }
    });

    scene.add(model);
  },
  (xhr) => {
    const percent = (xhr.loaded / xhr.total) * 100;
    document.getElementById("loading").textContent = `Cargando pastel... ${percent.toFixed(0)}%`;
  },
  (error) => {
    console.error("Error al cargar el pastel:", error);
  }
);

// Crear ciudad alrededor
const city = new THREE.Group();
for (let i = 0; i < 200; i++) {
  const geometry = new THREE.BoxGeometry(0.3, Math.random() * 2 + 0.5, 0.3);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
    roughness: 0.5,
    metalness: 0.4,
  });
  const building = new THREE.Mesh(geometry, material);
  building.position.x = (Math.random() - 0.5) * 20;
  building.position.z = (Math.random() - 0.5) * 20;
  building.position.y = geometry.parameters.height / 2;
  city.add(building);
}
scene.add(city);

// Controles de cámara
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Ajuste de ventana
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
