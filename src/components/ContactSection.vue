<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import * as THREE from "three";

const formContainer = ref(null);
const name = ref("");
const email = ref("");
const message = ref("");
const isSubmitting = ref(false);
const submitSuccess = ref(false);

// Form validation
const nameError = ref("");
const emailError = ref("");
const messageError = ref("");

const validateForm = () => {
  let isValid = true;

  // Reset errors
  nameError.value = "";
  emailError.value = "";
  messageError.value = "";

  // Validate name
  if (!name.value.trim()) {
    nameError.value = "Name is required";
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    emailError.value = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    emailError.value = "Please enter a valid email address";
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    messageError.value = "Message is required";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    submitSuccess.value = true;

    // Reset form
    name.value = "";
    email.value = "";
    message.value = "";

    // Reset success message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false;
    }, 5000);
  }, 1500);
};

// Three.js background
let scene, camera, renderer, particles;
let animationFrameId;

const initThreeJS = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Append renderer to DOM
  if (formContainer.value) {
    const canvas = formContainer.value.querySelector(".three-canvas");
    if (canvas) {
      canvas.appendChild(renderer.domElement);
    }
  }

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x9254de, // Secondary color
    transparent: true,
    opacity: 0.5,
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Handle resize
  window.addEventListener("resize", handleResize);
};

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  particles.rotation.x += 0.0003;
  particles.rotation.y += 0.0003;

  renderer.render(scene, camera);
};

onMounted(() => {
  // Animate form elements on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.from(".contact-content", {
            y: 50,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          });

          gsap.from(".contact-form", {
            y: 50,
            opacity: 0,
            duration: 0.7,
            delay: 0.3,
            ease: "power2.out",
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  if (formContainer.value) {
    observer.observe(formContainer.value);
  }

  // Initialize Three.js background
  initThreeJS();
  animate();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  cancelAnimationFrame(animationFrameId);

  // Clean up Three.js resources
  if (particles) {
    scene.remove(particles);
    particles.geometry.dispose();
    particles.material.dispose();
    renderer.dispose();
  }
});
</script>

<template>
  <section
    id="contact"
    class="section bg-gray-800 relative overflow-hidden"
    ref="formContainer"
  >
    <!-- Three.js Canvas -->
    <div class="three-canvas absolute inset-0 opacity-30"></div>

    <div class="container mx-auto relative z-10">
      <h2 class="text-4xl font-bold mb-16 text-center text-gradient">
        Get In Touch
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Contact Info -->
        <div class="contact-content">
          <h3 class="text-2xl font-semibold mb-6">Let's Work Together</h3>
          <p class="text-gray-300 mb-8">
            Have a project in mind or just want to say hello? I'd love to hear
            from you. Fill out the form and I'll get back to you as soon as
            possible.
          </p>

          <!-- Contact Details -->
          <div class="space-y-6">
            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-full bg-primary-700/20 flex items-center justify-center mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-primary-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
              </div>
              <span class="text-gray-300">contact@example.com</span>
            </div>

            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-full bg-primary-700/20 flex items-center justify-center mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-primary-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  />
                </svg>
              </div>
              <span class="text-gray-300">+1 (123) 456-7890</span>
            </div>

            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-full bg-primary-700/20 flex items-center justify-center mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-primary-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="text-gray-300">San Francisco, CA</span>
            </div>
          </div>

          <!-- Social Links -->
          <div class="flex space-x-4 mt-8">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm5.025 4.899c.75.561 1.051 1.433 1.051 2.472 0 1.008-.173 1.856-.661 2.544-.336.48-.825.895-1.447 1.273.192.308.44.608.623.937.181.329.304.75.423 1.175.111.433.195.929.195 1.497 0 1.056-.227 1.985-.661 2.674-.416.664-1.009 1.163-1.667 1.488-.659.32-1.419.484-2.251.484-.835 0-1.584-.164-2.251-.484-.663-.325-1.256-.824-1.673-1.488-.436-.69-.663-1.618-.663-2.674 0-.583.099-1.09.224-1.556.128-.448.296-.864.504-1.176.224-.332.405-.597.661-.879-.288-.276-.539-.548-.782-.932-.332-.531-.5-1.21-.5-2.013 0-.929.22-1.736.68-2.414.452-.675 1.077-1.193 1.877-1.539.783-.337 1.716-.504 2.776-.504.831 0 1.584.167 2.253.504.653.324 1.241.828 1.677 1.499zm-7.007 14.184c.241.12.531.179.895.179.536 0 .96-.139 1.291-.414.339-.283.508-.671.508-1.155 0-.44-.147-.813-.445-1.126-.285-.296-.729-.56-1.324-.793-.594-.24-.969-.42-1.291-.57-.317-.15-.652-.375-.968-.675-.324-.3-.556-.645-.691-1.035-.139-.404-.209-.866-.209-1.395 0-.829.195-1.539.57-2.126.379-.587.899-1.043 1.569-1.348.664-.313 1.412-.466 2.251-.466.789 0 1.524.12 2.198.375.676.251 1.236.597 1.688 1.035.45.44.749.954.87 1.529h-2.865c-.121-.375-.363-.66-.729-.854-.368-.194-.784-.285-1.229-.285-.464 0-.828.112-1.079.33-.252.218-.38.517-.38.9 0 .348.14.639.42.879.279.239.69.456 1.231.646.649.24 1.071.436 1.305.6.239.15.5.345.78.57.285.227.531.48.735.75.208.273.38.585.525.944.131.351.195.759.195 1.201 0 .827-.191 1.558-.587 2.175-.389.615-.93 1.08-1.648 1.423-.704.342-1.535.512-2.474.512-.976 0-1.837-.146-2.594-.436-.761-.295-1.372-.729-1.844-1.305-.468-.578-.713-1.292-.72-2.146h2.91c.061.593.333 1.058.811 1.394z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          class="contact-form bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700"
        >
          <form @submit.prevent="handleSubmit">
            <div class="mb-6">
              <label
                for="name"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Name</label
              >
              <input
                v-model="name"
                type="text"
                id="name"
                class="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your name"
              />
              <p v-if="nameError" class="mt-1 text-sm text-red-500">
                {{ nameError }}
              </p>
            </div>

            <div class="mb-6">
              <label
                for="email"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                id="email"
                class="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your email"
              />
              <p v-if="emailError" class="mt-1 text-sm text-red-500">
                {{ emailError }}
              </p>
            </div>

            <div class="mb-6">
              <label
                for="message"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Message</label
              >
              <textarea
                v-model="message"
                id="message"
                rows="4"
                class="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your message"
              ></textarea>
              <p v-if="messageError" class="mt-1 text-sm text-red-500">
                {{ messageError }}
              </p>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span
                v-if="isSubmitting"
                class="flex items-center justify-center"
              >
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
              <span v-else>Send Message</span>
            </button>

            <div
              v-if="submitSuccess"
              class="mt-4 p-3 bg-green-700/30 border border-green-600 rounded-md text-center text-green-200"
            >
              Your message has been sent successfully! I'll get back to you
              soon.
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
