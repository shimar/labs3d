// particlesystem.js
var container;
var camera;
var scene;
var renderer;
var light;
var controls;

var particles;
var particleMaterials;
var particleSystem;

var PARTICLE_LEN = 20000;

function init() {
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var aspect = width / height;

  container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 8000);
  camera.position = new THREE.Vector3(0, 20, 240);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  // renderer.
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // event listeners.
  window.addEventListener('resize', onWindowResize, false);

  // particle system.
  initParticles();

  // controls.
  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.maxDistance = 4000;
};

function initParticles() {
  particles = new THREE.Geometry();
  particleMaterials = new THREE.ParticleBasicMaterial({
    vertexColors: true
  });
  var colors = [];
  for (var i = 0; i < PARTICLE_LEN; i++) {
    var x = Math.random() * 2000 - 1000;
    var y = Math.random() * 2000 - 1000;
    var z = Math.random() * 2000 - 1000;
    var particle = new THREE.Vector3(x, y, z)
    particles.vertices.push(particle);
    colors.push(new THREE.Color(0x0000ff));
  }
  particles.colors = colors;
  particleSystem = new THREE.ParticleSystem(
    particles,
    particleMaterials
  );
  scene.add(particleSystem);
};

function animate() {
  render();
  requestAnimationFrame(animate);
};

function render() {
  controls.update();
  renderer.render(scene, camera);
};

function onWindowResize() {
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var aspect = width / height;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

init();
animate();
