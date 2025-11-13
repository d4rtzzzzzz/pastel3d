import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 100);
camera.position.set(2,2,4);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(3,5,2);
scene.add(light);

const geometry = new THREE.CylinderGeometry(1,1,0.5,32);
const material = new THREE.MeshStandardMaterial({color:0xffc0cb});
const pastel = new THREE.Mesh(geometry, material);
scene.add(pastel);

function animate(){
  requestAnimationFrame(animate);
  pastel.rotation.y += 0.01;
  renderer.render(scene,camera);
}
animate();
