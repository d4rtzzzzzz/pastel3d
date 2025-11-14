import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,1.5,3);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambient);

const dir = new THREE.DirectionalLight(0xffffff, 2);
dir.position.set(3,5,3);
scene.add(dir);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
loader.load("./pastel.glb",
 (gltf)=>{
    document.getElementById("loading").remove();
    const model = gltf.scene;
    model.position.set(0,-1,0);
    model.scale.set(1.4,1.4,1.4);
    scene.add(model);
 },
 (xhr)=>{
    const p = (xhr.loaded/xhr.total)*100;
    document.getElementById("loading").innerText = "Cargando pastel... " + p.toFixed(0) + "%";
 },
 (err)=> console.error(err)
);

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();

window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
