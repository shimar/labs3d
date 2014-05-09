// timeline.js
var KEY_UP   = 38;
var KEY_DOWN = 40;

var container;
var camera;
var scene, scene2;
var renderer, renderer2;
var light;
var controls;

var tlGeometry;
var timeline;
var box;

// array of timeline.
var vertices  = [];
var timeindex = 0;

init();
animate();

function init() {
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var aspect = width / height;

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, aspect, 1, 80000);
  camera.position.set(0, 0, 800);

  scene  = new THREE.Scene();
  scene2 = new THREE.Scene();

  // renderer.
  // renderer = new THREE.WebGLRenderer({antialias: true});
  renderer = new THREE.CanvasRenderer();
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  renderer2 = new THREE.CSS3DRenderer();
  renderer2.setSize(width, height);
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.top = 0;
  container.appendChild(renderer2.domElement);

  // controls.
  controls = new THREE.OrbitControls(camera, container);
  controls.noZoom = true;
  controls.noKeys = true;

  // lines.
  var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });
  tlGeometry = new THREE.Geometry();
  var lineStep = 800;
  for (var i = 0; i < 365; i++) {
    // var y = Math.pow(1.8, i) - 50;
    // var z = -i * lineStep + 400;
    var y = (i * i) * 6;
    var z = -i * lineStep + 200;
    var point = new THREE.Vector3(240, y, z);
    // tlGeometry.vertices.push(point);
    // tlGeometry.vertices.push(new THREE.Vector3(-240, y, z));
    vertices.push(point);
  }
  // timeline = new THREE.Line(tlGeometry, material, THREE.LinePieces);
  // scene.add(timeline);

  // var boxGeometry = new THREE.BoxGeometry(480, 240, 1);
  // var boxMaterial = new THREE.MeshPhongMaterial({color: 0x0000ff, opacity: 0.5});
  // box = new THREE.Mesh(boxGeometry, boxMaterial);
  // box.position.set(0, 0, 0);
  // scene.add(box);

  for (var j = 0; j < vertices.length; j++) {
    var geom = new THREE.BoxGeometry(480, 240, 1);
    var mat  = new THREE.MeshPhongMaterial({ color: 0x0000ff, opacity: .6 });
    var rect = new THREE.Mesh(geom, mat);
    var point = vertices[j];
    rect.position.set(0, point.y, point.z);
    scene.add(rect);
  }

  light = new THREE.AmbientLight(0xffffff);
  light.position.set(0, 500, 200);
  scene.add(light);

  // event listeners.
  window.addEventListener('resize',  onWindowResize, false);
  window.addEventListener('keydown', onKeyDown,      false);
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  render();
}

function render() {
  // var timer = 0.0001 * Date.now();
  // camera.position.x = Math.cos(timer) * 1000;
  // camera.position.z = Math.sin(timer) * 1000;
  // camera.lookAt(scene.position);
  renderer.render(scene, camera);
  renderer2.render(scene, camera);
}

function onWindowResize() {
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var aspect = width / height;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer2.setSize(width, height);
}

function onKeyDown(e) {
  if (e.keyCode !== KEY_UP && e.keyCode !== KEY_DOWN) {
    return true;
  }
  e.preventDefault();
  if (e.keyCode === KEY_UP) {
    // box.position.z -= 20;
    next(timeline);
  } else if (e.keyCode === KEY_DOWN) {
    // box.position.z += 20;
    prev(timeline);
  }
  return false;
}

function prev(object) {
  if (timeindex === 100) {
    return;
  }
  timeindex++;
  var tween = new TWEEN.Tween({x: camera.position.x, y: camera.position.y, z: camera.position.z})
              .to({x: 0, y: vertices[timeindex].y, z: vertices[timeindex].z + 600})
              .easing(TWEEN.Easing.Cubic.Out)
              .onUpdate(function() {
                camera.position.set(this.x, this.y, this.z);
              })
              .start();
}

function next(object) {
  if (timeindex === 0) {
    return;
  }
  timeindex--;
  var tween = new TWEEN.Tween({x: camera.position.x, y: camera.position.y, z: camera.position.z})
              .to({x: 0, y: vertices[timeindex].y, z: vertices[timeindex].z + 600})
              .easing(TWEEN.Easing.Cubic.Out)
              .onUpdate(function() {
                camera.position.set(this.x, this.y, this.z);
              })
              .start();
}
