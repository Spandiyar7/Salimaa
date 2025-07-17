
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Свет
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Сердце: простое 3D-объёмное сердце
const x = 0, y = 0;
const heartShape = new THREE.Shape();
heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

const geometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 2,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1
});

const material = new THREE.MeshPhongMaterial({ color: 0xff4d6d, shininess: 100 });
const heart = new THREE.Mesh(geometry, material);
heart.rotation.x = Math.PI;
scene.add(heart);

camera.position.z = 40;

// Обработка ресайза
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Анимация
function animate() {
  requestAnimationFrame(animate);
  heart.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Показать текст через 5 сек
setTimeout(() => {
  document.getElementById('text-block').style.display = 'block';
}, 5000);
