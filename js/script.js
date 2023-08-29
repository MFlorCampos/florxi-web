import * as THREE from "./lib/three.module.js";
import { GLTFLoader } from "./lib/loaders/GLTFLoader.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const scrollDistance =
  document.getElementsByTagName("html")[0].offsetHeight / 1000;

// Material

const lotusMaterial = new THREE.MeshPhongMaterial({
  color: "#BD3A60",
});

const starMaterial = new THREE.MeshPhongMaterial({
  color: "#BD3A60",
});

// Material
const particlesMaterial = new THREE.PointsMaterial({
  color: "#000",
  sizeAttenuation: true,
  size: 0.03,
});

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 2);
directionalLight.position.set(2, 2, 6);
scene.add(directionalLight);

/**
 * Objects
 */
// Meshes
let mesh;
let mesh2;

/**
 * Particles
 */
// Geometry
const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] =
    scrollDistance * 0.5 - Math.random() * scrollDistance * 6;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    currentSection = newSection;
  }
});

//Horizontal scroll

const postScroll = document.querySelector("div.container-scroll");

postScroll.addEventListener("mouseenter", function () {
  let scrollingHorizontally = true;

  function toggle() {
    scrollingHorizontally = !scrollingHorizontally;
  }

  postScroll.addEventListener("wheel", (event) => {
    if (scrollingHorizontally) {
      postScroll.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });

      event.preventDefault();

      // check if the user has reached the end of the slider
      if (
        Math.round(postScroll.scrollLeft) >=
        postScroll.scrollWidth - postScroll.clientWidth
      ) {
        toggle();
        postScroll.style.overflowY = "auto";
      }

      if (postScroll.scrollLeft === 0) {
        toggle();
        postScroll.style.overflowY = "auto";
      }
    } else {
      return true;
    }
  });
});

postScroll.addEventListener("mouseout", function () {
  let scrollingHorizontally = false;
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/**
 * Check if its mobile
 */

window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const lotus = new GLTFLoader().setPath("models/lotus/");
lotus.load("scene.gltf", function (gltf) {
  mesh = gltf.scene;
  mesh.traverse((o) => {
    if (o.isMesh) o.material = lotusMaterial;
  });

  if (mobileCheck()) {
    mesh.position.x = 0;
    mesh.position.y = -1.5;
    camera.position.z = 10;
  } else {
    mesh.position.y = -3;
    mesh.position.x = 2;
    mesh.rotation.x = 2;
  }

  scene.add(mesh);

  renderer.render(scene, camera);
});

const star = new GLTFLoader().setPath("models/heart_emoji/");
star.load("scene.gltf", function (gltf) {
  mesh2 = gltf.scene;
  mesh2.traverse((o) => {
    if (o.isMesh) o.material = starMaterial;
  });

  if (mobileCheck()) {
    mesh2.position.x = 0;
    mesh2.position.y = -5;
    mesh2.rotation.y = 10;
  } else {
    mesh2.position.y = -7;
    mesh2.position.x = -1.5;
    mesh2.rotation.x = 0;
    mesh2.rotation.y = 10;
  }

  scene.add(mesh2);

  renderer.render(scene, camera);
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate meshes
  if (mesh && mesh.rotation && mesh2 && mesh2.rotation) {
    // mesh.rotation.x += deltaTime * 0.1;
    mesh.rotation.y += deltaTime * 0.12;
    mesh2.rotation.x += deltaTime * 0.12;
  }

  // Animate camera
  camera.position.y =
    (-scrollY / sizes.height) *
    (document.getElementsByTagName("html")[0].offsetHeight / 1000);

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;

  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
