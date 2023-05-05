import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
const webgl = document.get;

//Scene
const scene = new Three.Scene();

const geometry = new Three.SphereGeometry(3, 64, 64);
const material = new Three.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.2,
});

const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

// Sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//light
const light = new Three.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);
//camera
const camera = new Three.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");

const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

loop();

// timeline anim
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });
