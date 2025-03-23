<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const skills = [
  {
    name: "Vue.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    level: 95,
    color: "#42b883",
  },
  {
    name: "Laravel",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
    level: 80,
    color: "#ff2d20",
  },
  {
    name: "WordPress",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    level: 81,
    color: "#21759b",
  },
  {
    name: "Tailwind CSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    level: 90,
    color: "#38bdf8",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    level: 78,
    color: "#777BB4",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
    level: 70,
    color: "#4479A1",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: 90,
    color: "#f7df1e",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: 85,
    color: "#3178c6",
  },
  {
    name: "Three.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    level: 75,
    color: "#222222",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    level: 90,
    color: "#1572b6",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    level: 95,
    color: "#e34f26",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: 85,
    color: "#f05032",
  },
];

const skillCards = ref([]);

// Function to get random value within a range
const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Function to handle mouse move for 3D effect
const handleMouseMove = (e, index) => {
  const card = skillCards.value[index];
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    transformPerspective: 500,
    duration: 0.5,
    ease: "power1.out",
  });
};

// Function to reset card rotation
const handleMouseLeave = (index) => {
  const card = skillCards.value[index];
  if (!card) return;

  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.5,
    ease: "power1.out",
  });
};

onMounted(() => {
  // Animate skill cards on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: entry.target.dataset.index * 0.1,
            ease: "power2.out",
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe each skill card
  skillCards.value.forEach((card) => {
    gsap.set(card, { opacity: 0, y: 50 });
    observer.observe(card);
  });
});
</script>

<template>
  <section id="skills" class="section bg-gray-800">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold mb-16 text-center text-gradient">
        My Skills
      </h2>

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
      >
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          ref="skillCards"
          :data-index="index"
          class="skill-card bg-gray-900 rounded-xl p-6 shadow-lg"
          :style="`--card-color: ${skill.color}30`"
          @mousemove="(e) => handleMouseMove(e, index)"
          @mouseleave="() => handleMouseLeave(index)"
        >
          <div class="flex flex-col items-center">
            <div
              class="icon-container mb-4 w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full p-3 overflow-hidden"
            >
              <img :src="skill.icon" :alt="skill.name" class="w-14 h-14 object-contain" />
            </div>

            <h3 class="text-xl font-medium mb-3 text-center">{{ skill.name }}</h3>

            <div class="w-full bg-gray-700 rounded-full h-2.5 mb-1">
              <div
                class="h-2.5 rounded-full"
                :style="`width: ${skill.level}%; background-color: ${skill.color}`"
              ></div>
            </div>

            <span class="text-sm text-gray-400">{{ skill.level }}%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
}

.skill-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--card-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card:hover::before {
  opacity: 0.5;
}

.skill-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.icon-container {
  transform: translateZ(20px);
  transition: transform 0.3s ease;
}

.skill-card:hover .icon-container {
  transform: translateZ(40px);
}
</style>
