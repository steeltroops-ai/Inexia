// Hero animation
const canvas = document.getElementById("hero-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(5, 32, 32);
const texture = new THREE.TextureLoader().load("img/galaxy.jpg");
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

camera.position.z = 10;

function animate() {
requestAnimationFrame(animate);
sphere.rotation.y += 0.002;
renderer.render(scene, camera);
}

animate();