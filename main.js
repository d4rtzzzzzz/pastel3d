<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pastel 3D</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background: #f8e0f2;
            font-family: Arial, sans-serif;
        }
        #loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 22px;
            color: #333;
        }
    </style>
</head>
<body>
    <div id="loading">Cargando pastel...</div>

    <script type="module">
        import * as THREE from "https://unpkg.com/three@0.152.2/build/three.module.js";
        import { OrbitControls } from "https://unpkg.com/three@0.152.2/examples/jsm/controls/OrbitControls.js";

        // Crear escena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#f8e0f2");

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(3, 3, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Luz
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambient);

        // Crear "pastel"
        const geometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
        const material = new THREE.MeshStandardMaterial({ color: "pink" });
        const cake = new THREE.Mesh(geometry, material);
        scene.add(cake);

        // Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement);

        // Ocultar texto de carga
        document.getElementById("loading").style.display = "none";

        // Animación
        function animate() {
            requestAnimationFrame(animate);
            cake.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        // Ajuste al redimensionar ventana
        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>
