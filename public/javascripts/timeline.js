// timeline.js
var container;
var camera;
var scene;
var renderer;
var light;
var controls;

init();
animate();

function init() {
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var aspect = width / height;

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
  camera.position.set(0, 200, 800);

  scene  = new THREE.Scene();

  // renderer.
  // renderer = new THREE.WebGLRenderer({antialias: true});
  renderer = new THREE.CanvasRenderer();
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // controls.
  controls = new THREE.OrbitControls(camera, container);

  // lines.
  var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });
  var lineGeometry = new THREE.Geometry();
  var lineStep = 200;
  for (var i = 0; i < 100; i++) {
    var y = Math.pow(1.8, i) - 50;
    var z = -i * lineStep + 400;
    lineGeometry.vertices.push(new THREE.Vector3( 240, y, z));
    lineGeometry.vertices.push(new THREE.Vector3(-240, y, z));
  }
  var line = new THREE.Line(lineGeometry, material, THREE.LinePieces);
  scene.add(line);


  // grid
  // var lineMaterial = new THREE.LineBasicMaterial({
  //   color: 0x303030
  // });
  // var geometry = new THREE.Geometry();
  // var floor = -75;
  // var step  = 25;

  // for (var i = 0; i <= 40; i++) {
  //   geometry.vertices.push(new THREE.Vector3(-500, floor, i * step - 500));
  //   geometry.vertices.push(new THREE.Vector3( 500, floor, i * step - 500));

  //   geometry.vertices.push(new THREE.Vector3(i * step - 500, floor, -500));
  //   geometry.vertices.push(new THREE.Vector3(i * step - 500, floor,  500));
  // }
  // var grid = new THREE.Line(geometry, lineMaterial, THREE.LinePieces);
  // scene.add(grid);

  // event listeners.
  window.addEventListener('resize', onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  // var timer = 0.0001 * Date.now();
  // camera.position.x = Math.cos(timer) * 1000;
  // camera.position.z = Math.sin(timer) * 1000;
  // camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

function onWindowResize() {
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var aspect = width / height;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
