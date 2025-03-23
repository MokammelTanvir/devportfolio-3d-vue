<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-950 text-gray-400 py-12">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Logo and Copyright -->
        <div class="mb-8 md:mb-0">
          <h2 class="text-2xl font-bold text-gradient mb-3">MokammelTanvir</h2>
          <p class="text-sm">© {{ currentYear }} All rights reserved.</p>
        </div>

        <!-- Quick Links -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 md:mb-0">
          <div>
            <h3 class="text-white font-medium mb-4">Navigation</h3>
            <ul class="space-y-2">
              <li>
                <a href="#home" class="hover:text-primary-400 transition-colors"
                  >Home</a
                >
              </li>
              <li>
                <a
                  href="#about"
                  class="hover:text-primary-400 transition-colors"
                  >About</a
                >
              </li>
              <li>
                <a
                  href="#skills"
                  class="hover:text-primary-400 transition-colors"
                  >Skills</a
                >
              </li>
              <li>
                <a
                  href="#projects"
                  class="hover:text-primary-400 transition-colors"
                  >Projects</a
                >
              </li>
              <li>
                <a
                  href="#contact"
                  class="hover:text-primary-400 transition-colors"
                  >Contact</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-medium mb-4">Social</h3>
            <ul class="space-y-2">
              <li>
                <a href="https://github.com/mokammeltanvir" target="_blank" class="hover:text-primary-400 transition-colors"
                  >GitHub</a
                >
              </li>
              <li>
                <a href="https://linkedin.com/in/mokammeltanvir" target="_blank" class="hover:text-primary-400 transition-colors"
                  >LinkedIn</a
                >
              </li>
              <li>
                <a href="https://twitter.com/mokammeltanvir" target="_blank" class="hover:text-primary-400 transition-colors"
                  >Twitter</a
                >
              </li>
              <li>
                <a href="https://instagram.com/mokammeltanvir" target="_blank" class="hover:text-primary-400 transition-colors"
                  >Instagram</a
                >
              </li>
            </ul>
          </div>

          <div class="col-span-2 md:col-span-1">
            <h3 class="text-white font-medium mb-4">Contact</h3>
            <ul class="space-y-2">
              <li>tanvir@mokammeltanvir.com</li>
              <li>+8801915557363</li>
              <li>Uttara, Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <!-- Back to Top -->
        <div class="flex flex-col items-center">
          <a
            href="#home"
            class="p-3 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </a>
          <span class="text-sm">Back to Top</span>
        </div>
      </div>

      <!-- Credit Line -->
      <div class="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
        <p>
          Designed & Developed by <span class="text-gradient font-bold">Mokammel Tanvir</span> using Vue.js, Tailwind CSS and Three.js
        </p>
      </div>
    </div>
  </footer>
</template>
