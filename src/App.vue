<script setup>
import HeroSection from "./components/HeroSection.vue";
import AboutSection from "./components/AboutSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ContactSection from "./components/ContactSection.vue";
import NavBar from "./components/NavBar.vue";
import FooterSection from "./components/FooterSection.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <NavBar />

    <main>
      <HeroSection id="home" />
      <AboutSection id="about" />
      <SkillsSection id="skills" />
      <ProjectsSection id="projects" />
      <ContactSection id="contact" />
    </main>

    <FooterSection />
  </div>
</template>

<style>
/* Global styles can be added here */
</style>
