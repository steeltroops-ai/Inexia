// Create a Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a Three.js renderer and add it to the webpage
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("hero-canvas"), antialias: true});
renderer.setClearColor("#1a1a1a");
renderer.setSize(window.innerWidth, window.innerHeight);

// Load the 3D model of the anime boy
const loader = new THREE.GLTFLoader();
loader.load("models/anime-boy.glb", function(gltf) {
  const model = gltf.scene.children[0];
  scene.add(model);
});

// Position the camera and animate the scene
camera.position.z = 5;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
