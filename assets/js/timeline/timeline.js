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
  camera.position.set(-100, 0, 800);

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
    vertices.push(point);
  }
  for (var j = 0; j < vertices.length; j++) {
    var point = vertices[j];
    var $element = $(document.createElement('div'));
    $element.addClass('date-block');
    $element.html('' + (j + 1));
    var object = new THREE.CSS3DObject($element[0]);
    object.position.set(0, point.y, point.z);
    scene2.add(object);
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
  renderer.render(scene, camera);
  renderer2.render(scene2, camera);
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
    prev(timeline);
  } else if (e.keyCode === KEY_DOWN) {
    next(timeline);
  }
  return false;
}

function prev(object) {
  if (timeindex === 100) {
    return;
  }
  timeindex++;
  var tween = new TWEEN.Tween({x: camera.position.x, y: camera.position.y, z: camera.position.z})
              .to({x: -100, y: vertices[timeindex].y, z: vertices[timeindex].z + 500})
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
              .to({x: -100, y: vertices[timeindex].y, z: vertices[timeindex].z + 500})
              .easing(TWEEN.Easing.Cubic.Out)
              .onUpdate(function() {
                camera.position.set(this.x, this.y, this.z);
              })
              .start();
}
