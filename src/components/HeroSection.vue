<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { gsap } from "gsap";

const canvasContainer = ref(null);
const computerContainer = ref(null);
let scene, camera, renderer, particles;
let computerScene, computerCamera, computerRenderer, computer;
let animationFrameId, computerAnimationFrameId;

const initThreeJS = () => {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  // Create renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Append renderer to DOM
  if (canvasContainer.value) {
    canvasContainer.value.appendChild(renderer.domElement);
  }

  // Create particle system
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 3000;

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x40a9ff,
    transparent: true,
    opacity: 0.8,
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Handle resize
  window.addEventListener("resize", handleResize);
};

// Initialize Computer 3D Model
const initComputerModel = () => {
  // Create scene
  computerScene = new THREE.Scene();

  // Create camera
  computerCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  computerCamera.position.z = 5;

  // Create renderer
  computerRenderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  computerRenderer.setSize(350, 350);

  // Append renderer to container
  if (computerContainer.value) {
    computerContainer.value.appendChild(computerRenderer.domElement);
  }

  // Create Computer
  // Monitor
  const monitorGeometry = new THREE.BoxGeometry(3, 2, 0.1);
  const monitorMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
  
  // Screen
  const screenGeometry = new THREE.BoxGeometry(2.7, 1.7, 0.11);
  const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x1e88e5 });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.z = 0.05;
  
  // Add code lines on screen
  const linesCount = 8;
  const lineHeight = 0.12;
  const lineSpacing = 0.16;
  const startY = 0.6;
  
  for (let i = 0; i < linesCount; i++) {
    // Random width for each line
    const width = 0.7 + Math.random() * 1.3;
    const lineGeometry = new THREE.BoxGeometry(width, lineHeight, 0.01);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    
    // Position lines
    line.position.y = startY - (i * lineSpacing);
    line.position.z = 0.07;
    
    // Alternate line alignment (left, right, center)
    if (i % 3 === 0) {
      line.position.x = -0.1; // Left aligned
    } else if (i % 3 === 1) {
      line.position.x = 0.1; // Right aligned
    } else {
      line.position.x = 0; // Center aligned
    }
    
    screen.add(line);
  }
  
  // Stand
  const standTopGeometry = new THREE.BoxGeometry(0.6, 0.5, 0.1);
  const standMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
  const standTop = new THREE.Mesh(standTopGeometry, standMaterial);
  standTop.position.y = -1.25;
  
  // Base
  const baseGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.8);
  const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -1.50;
  
  // Keyboard
  const keyboardGeometry = new THREE.BoxGeometry(2, 0.1, 0.8);
  const keyboardMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
  keyboard.position.y = -1.6;
  keyboard.position.z = 1.0;
  
  // Keys on keyboard
  const keysRowCount = 3;
  const keysPerRow = 10;
  const keySize = 0.12;
  const keySpacing = 0.14;
  const startX = -0.8;
  
  for (let row = 0; row < keysRowCount; row++) {
    for (let col = 0; col < keysPerRow; col++) {
      const keyGeometry = new THREE.BoxGeometry(keySize, 0.05, keySize);
      const keyMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });
      const key = new THREE.Mesh(keyGeometry, keyMaterial);
      
      key.position.x = startX + (col * keySpacing);
      key.position.y = 0.08;
      key.position.z = 0.1 + (row * keySpacing);
      
      keyboard.add(key);
    }
  }
  
  // Group all elements
  computer = new THREE.Group();
  computer.add(monitor);
  computer.add(screen);
  computer.add(standTop);
  computer.add(base);
  computer.add(keyboard);
  
  computer.rotation.x = 0.2; // Tilt forward slightly
  
  computerScene.add(computer);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  computerScene.add(ambientLight);
};

const handleResize = () => {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  // Rotate particles
  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.0005;

  // Render scene
  renderer.render(scene, camera);
};

const animateComputer = () => {
  computerAnimationFrameId = requestAnimationFrame(animateComputer);
  
  // Rotate computer
  computer.rotation.y += 0.01;
  
  // Render scene
  computerRenderer.render(computerScene, computerCamera);
};

// Animation for text elements
const animateText = () => {
  const tl = gsap.timeline();
  tl.from(".hero-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
    .from(
      ".hero-subtitle",
      { y: 30, opacity: 0, duration: 1, ease: "power3.out" },
      "-=0.7"
    )
    .from(
      ".hero-cta",
      { y: 30, opacity: 0, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
};

onMounted(() => {
  initThreeJS();
  initComputerModel();
  animate();
  animateComputer();
  animateText();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  cancelAnimationFrame(animationFrameId);
  cancelAnimationFrame(computerAnimationFrameId);

  // Clean up Three.js resources
  scene.remove(particles);
  particles.geometry.dispose();
  particles.material.dispose();
  renderer.dispose();
  
  // Clean up computer resources
  computerScene.remove(computer);
  computer.children.forEach(child => {
    child.geometry.dispose();
    child.material.dispose();
  });
  computerRenderer.dispose();
});
</script>

<template>
  <section
    class="hero-section relative flex items-center justify-center overflow-hidden bg-gray-900"
  >
    <!-- Three.js Canvas Container -->
    <div ref="canvasContainer" class="absolute inset-0 z-0"></div>

    <!-- Content -->
    <div class="z-10 container mx-auto px-6 py-32 md:py-48">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="max-w-2xl md:w-1/2 mb-16 md:mb-0">
          <h1
            class="hero-title text-4xl md:text-6xl font-bold mb-6 text-gradient"
          >
            Hi, I'm<br />Mokammel Tanvir
          </h1>
          <p class="hero-subtitle text-xl md:text-2xl text-gray-300 mb-10">
            Full Stack Developer specializing in Laravel, WordPress, and modern JavaScript frameworks.
            Delivering efficient solutions with clean code.
          </p>

          <div class="hero-cta flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              class="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              class="px-8 py-3 border border-primary-500 text-primary-500 hover:bg-primary-500/10 rounded-md transition-colors text-center"
            >
              Contact Me
            </a>
          </div>
        </div>
        
        <!-- 3D Computer Model -->
        <div class="md:w-1/2 flex justify-center">
          <div class="relative w-[350px] h-[350px]">
            <div ref="computerContainer" class="w-full h-full"></div>
            <!-- Decorative elements -->
            <div
              class="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-500/20 rounded-full blur-xl"
            ></div>
            <div
              class="absolute -top-6 -right-6 w-24 h-24 bg-secondary-500/20 rounded-full blur-xl"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-10 left-0 right-0 flex justify-center">
      <a href="#about" class="animate-bounce text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
    </div>
  </section>
</template>
