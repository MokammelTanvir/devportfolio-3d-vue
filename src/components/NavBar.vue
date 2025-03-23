<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Watch scroll position to apply styling based on scroll
const watchScroll = () => {
  isScrolled.value = y.value > 50;
};

onMounted(() => {
  window.addEventListener("scroll", watchScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", watchScroll);
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <nav
    :class="[
      'fixed w-full z-50 transition-all duration-300',
      isScrolled
        ? 'bg-gray-900/90 backdrop-blur-md py-3 shadow-lg'
        : 'bg-transparent py-5',
    ]"
  >
    <div class="container mx-auto px-6 flex justify-between items-center">
      <!-- Logo -->
      <a href="#" class="text-2xl font-bold text-gradient">DevPortfolio</a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        <a
          href="#home"
          class="text-white hover:text-primary-400 transition-colors"
          >Home</a
        >
        <a
          href="#about"
          class="text-white hover:text-primary-400 transition-colors"
          >About</a
        >
        <a
          href="#skills"
          class="text-white hover:text-primary-400 transition-colors"
          >Skills</a
        >
        <a
          href="#projects"
          class="text-white hover:text-primary-400 transition-colors"
          >Projects</a
        >
        <a
          href="#contact"
          class="text-white hover:text-primary-400 transition-colors"
          >Contact</a
        >
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-gray-800 absolute w-full px-6 py-4 shadow-lg"
    >
      <div class="flex flex-col space-y-4">
        <a
          href="#home"
          @click="isMobileMenuOpen = false"
          class="text-white hover:text-primary-400 transition-colors"
          >Home</a
        >
        <a
          href="#about"
          @click="isMobileMenuOpen = false"
          class="text-white hover:text-primary-400 transition-colors"
          >About</a
        >
        <a
          href="#skills"
          @click="isMobileMenuOpen = false"
          class="text-white hover:text-primary-400 transition-colors"
          >Skills</a
        >
        <a
          href="#projects"
          @click="isMobileMenuOpen = false"
          class="text-white hover:text-primary-400 transition-colors"
          >Projects</a
        >
        <a
          href="#contact"
          @click="isMobileMenuOpen = false"
          class="text-white hover:text-primary-400 transition-colors"
          >Contact</a
        >
      </div>
    </div>
  </nav>
</template>
