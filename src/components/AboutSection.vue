<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";

const modelContainer = ref(null);
let scene, camera, renderer, developerModel;
let animationFrameId;

const initThreeJS = () => {
  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(75, 450 / 450, 0.1, 1000);
  camera.position.z = 5;

  // Create renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(450, 450);

  // Append renderer to container
  if (modelContainer.value) {
    modelContainer.value.appendChild(renderer.domElement);
  }

  // Create developer model
  createDeveloperModel();
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Add point light for better highlights
  const pointLight = new THREE.PointLight(0x40a9ff, 1, 10);
  pointLight.position.set(2, 1, 2);
  scene.add(pointLight);
};

const createDeveloperModel = () => {
  // Create a group to hold all parts
  developerModel = new THREE.Group();
  
  // Scale the entire model up
  developerModel.scale.set(1.2, 1.2, 1.2);
  
  // Create desk
  const deskGeometry = new THREE.BoxGeometry(3, 0.1, 1.5);
  const deskMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x5D4037, 
    roughness: 0.7,
    metalness: 0.1 
  });
  const desk = new THREE.Mesh(deskGeometry, deskMaterial);
  desk.position.y = -1;
  developerModel.add(desk);
  
  // Create laptop base
  const laptopBaseGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.8);
  const laptopMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x424242, 
    roughness: 0.2,
    metalness: 0.8 
  });
  const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopMaterial);
  laptopBase.position.y = -0.9;
  laptopBase.position.z = -0.1;
  developerModel.add(laptopBase);
  
  // Create laptop screen
  const laptopScreenGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.05);
  const screenMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x212121, 
    roughness: 0.2,
    metalness: 0.8 
  });
  const laptopScreen = new THREE.Mesh(laptopScreenGeometry, screenMaterial);
  laptopScreen.position.y = -0.45;
  laptopScreen.position.z = -0.5;
  laptopScreen.rotation.x = -Math.PI / 6; // Tilt screen
  developerModel.add(laptopScreen);
  
  // Create screen display (blue glow)
  const displayGeometry = new THREE.PlaneGeometry(1.1, 0.7);
  const displayMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x0A84FF, 
    transparent: true,
    opacity: 0.8
  });
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.y = -0.45;
  display.position.z = -0.48;
  display.rotation.x = -Math.PI / 6; // Match screen tilt
  developerModel.add(display);
  
  // Create code lines on screen
  const codeLineCount = 6;
  const codeLineHeight = 0.05;
  const codeLineSpacing = 0.08;
  const startY = -0.2;
  
  for (let i = 0; i < codeLineCount; i++) {
    // Random width for each line (simulate code)
    const width = 0.3 + Math.random() * 0.7;
    const lineGeometry = new THREE.PlaneGeometry(width, codeLineHeight);
    const lineMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.9
    });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    
    // Position lines
    line.position.y = startY - (i * codeLineSpacing);
    line.position.z = -0.475;
    line.rotation.x = -Math.PI / 6; // Match screen tilt
    
    // Alternate line alignment (left, right, center)
    if (i % 3 === 0) {
      line.position.x = -0.3; // Left aligned
    } else if (i % 3 === 1) {
      line.position.x = 0.3; // Right aligned
    } else {
      line.position.x = 0; // Center aligned
    }
    
    developerModel.add(line);
  }
  
  // Create person (head and shoulders)
  const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
  const skinMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xFFD3B4, 
    roughness: 0.8,
    metalness: 0.1
  });
  const head = new THREE.Mesh(headGeometry, skinMaterial);
  head.position.y = 0.4;
  head.position.z = 0.4;
  developerModel.add(head);
  
  // Create hair
  const hairGeometry = new THREE.BoxGeometry(0.28, 0.15, 0.28);
  const hairMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3A3A3A, 
    roughness: 1.0,
    metalness: 0.0
  });
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  hair.position.y = 0.55;
  hair.position.z = 0.4;
  developerModel.add(hair);
  
  // Create upper body
  const bodyGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.3);
  const shirtMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2979FF, 
    roughness: 0.9,
    metalness: 0.0
  });
  const body = new THREE.Mesh(bodyGeometry, shirtMaterial);
  body.position.y = -0.05;
  body.position.z = 0.4;
  developerModel.add(body);
  
  // Create arms
  const armGeometry = new THREE.BoxGeometry(0.15, 0.5, 0.15);
  
  // Left arm
  const leftArm = new THREE.Mesh(armGeometry, shirtMaterial);
  leftArm.position.set(-0.35, -0.05, 0.25);
  leftArm.rotation.z = -Math.PI / 6; // Tilt arm outward
  developerModel.add(leftArm);
  
  // Right arm
  const rightArm = new THREE.Mesh(armGeometry, shirtMaterial);
  rightArm.position.set(0.35, -0.05, 0.25);
  rightArm.rotation.z = Math.PI / 6; // Tilt arm outward
  developerModel.add(rightArm);
  
  // Create hands
  const handGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  
  // Left hand
  const leftHand = new THREE.Mesh(handGeometry, skinMaterial);
  leftHand.position.set(-0.42, -0.25, 0.25);
  developerModel.add(leftHand);
  
  // Right hand
  const rightHand = new THREE.Mesh(handGeometry, skinMaterial);
  rightHand.position.set(0.42, -0.25, 0.25);
  developerModel.add(rightHand);
  
  // Add model to scene
  developerModel.rotation.x = 0.1; // Tilt forward slightly
  developerModel.rotation.y = -Math.PI / 8; // Slightly rotate
  developerModel.position.y = -0.2; // Move down slightly
  
  scene.add(developerModel);
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  // Smooth rotation
  if (developerModel) {
    developerModel.rotation.y += 0.005;
  }

  // Render scene
  renderer.render(scene, camera);
};

onMounted(() => {
  initThreeJS();
  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);

  // Clean up Three.js resources
  if (developerModel) {
    scene.remove(developerModel);
    developerModel.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) object.material.dispose();
    });
  }
  renderer.dispose();
});
</script>

<template>
  <section id="about" class="section bg-gray-900">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold mb-16 text-center text-gradient">
        About Me
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- 3D Developer Model - Left side -->
        <div class="mx-auto md:mx-0 flex justify-center md:justify-start">
          <div class="relative">
            <div ref="modelContainer" class="w-[450px] h-[450px]"></div>
            <!-- Decorative elements -->
            <div
              class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-xl"
            ></div>
            <div
              class="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-xl"
            ></div>
          </div>
        </div>

        <!-- About Content - Right side -->
        <div class="md:pl-8">
          <h3 class="text-2xl font-semibold mb-6">
            Full Stack Developer
          </h3>
          <p class="text-gray-300 mb-6">
            I'm proficient in PHP, JavaScript, and frameworks like Laravel, VueJS, and WordPress. 
            With a passion for clean code, efficiency, and continuous learning, I deliver effective 
            solutions for rapid development.
          </p>
          <p class="text-gray-300 mb-8">
            I began my journey while studying Computer Science and Engineering, working part-time as 
            a PHP Web Developer. Since then, I have held various roles, including Full Stack Web Developer 
            at Durbin IT, and have consistently demonstrated expertise in web development and digital marketing.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-gray-800/50 p-4 rounded-lg">
              <h4 class="text-3xl font-bold text-primary-500">5+</h4>
              <p class="text-sm text-gray-400">Years Experience</p>
            </div>
            <div class="bg-gray-800/50 p-4 rounded-lg">
              <h4 class="text-3xl font-bold text-primary-500">150+</h4>
              <p class="text-sm text-gray-400">Projects Completed</p>
            </div>
            <div class="bg-gray-800/50 p-4 rounded-lg">
              <h4 class="text-3xl font-bold text-primary-500">@Uttara, Dhaka</h4>
              <p class="text-sm text-gray-400">Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
