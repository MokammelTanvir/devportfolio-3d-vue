<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const projects = [
  {
    title: "Scarlet Fashion BD",
    description:
      "E-commerce website for a fashion brand with online shopping capabilities built with WordPress.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["WordPress", "E-Commerce", "WooCommerce"],
    link: "#",
    github: "#",
  },
  {
    title: "ATC Wholesale Point",
    description:
      "WordPress-based e-commerce platform for wholesale products with inventory management.",
    image:
      "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["WordPress", "E-Commerce", "PHP"],
    link: "#",
    github: "#",
  },
  {
    title: "HalKhata-Inventory-SPA",
    description:
      "A single-page application for inventory management built with Laravel and Vue.js.",
    image:
      "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Laravel", "Vue.js", "Frontend"],
    link: "#",
    github: "#",
  },
  {
    title: "Barta",
    description:
      "Social media application developed with Laravel framework with user authentication and interaction features.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Laravel", "PHP", "Full Stack"],
    link: "#",
    github: "#",
  },
  {
    title: "Venue Vista",
    description:
      "Event venue management system built with Laravel, featuring booking and scheduling functionality.",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Laravel", "MySQL", "Bootstrap"],
    link: "#",
    github: "#",
  },
  {
    title: "ChakriBakri | The Job Board",
    description:
      "Job portal built as a single-page application using Laravel, helping connect job seekers with employers.",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Laravel", "SPA", "Job Board"],
    link: "#",
    github: "#",
  },
];

const projectCards = ref([]);

// Function to handle mouse move for 3D effect
const handleMouseMove = (e, index) => {
  const card = projectCards.value[index];
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 15;
  const rotateY = (centerX - x) / 15;

  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    transformPerspective: 1000,
    duration: 0.5,
    ease: "power2.out",
  });

  // Add shine effect
  const glare = card.querySelector(".glare");
  if (glare) {
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    gsap.to(glare, {
      opacity: 0.2,
      x: percentX + "%",
      y: percentY + "%",
      duration: 0.5,
    });
  }
};

// Function to reset card rotation
const handleMouseLeave = (index) => {
  const card = projectCards.value[index];
  if (!card) return;

  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    z: 0,
    duration: 0.5,
    ease: "power2.out",
  });

  // Reset glare effect
  const glare = card.querySelector(".glare");
  if (glare) {
    gsap.to(glare, {
      opacity: 0,
      duration: 0.5,
    });
  }
};

onMounted(() => {
  // Animate project cards on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power2.out",
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe each project card
  projectCards.value.forEach((card) => {
    gsap.set(card, { opacity: 0, y: 100 });
    observer.observe(card);
  });
});
</script>

<template>
  <section id="projects" class="section bg-gray-900 relative">
    <!-- Background elements -->
    <div
      class="absolute top-20 left-20 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-20 right-20 w-64 h-64 bg-secondary-600/10 rounded-full blur-3xl"
    ></div>

    <div class="container mx-auto relative">
      <h2 class="text-4xl font-bold mb-16 text-center text-gradient">
        My Projects
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.title"
          ref="projectCards"
          class="project-card bg-gray-800 rounded-xl overflow-hidden card-hover"
          @mousemove="(e) => handleMouseMove(e, index)"
          @mouseleave="() => handleMouseLeave(index)"
        >
          <!-- Glare effect -->
          <div class="glare"></div>

          <!-- Project Image -->
          <div class="project-image-container h-48 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 ease-in-out"
            />
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-3">{{ project.title }}</h3>

            <p class="text-gray-400 mb-4">{{ project.description }}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-300"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Links -->
            <div class="flex justify-between">
              <a
                :href="project.link"
                class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                target="_blank"
              >
                View Project
              </a>

              <a
                :href="project.github"
                class="px-4 py-2 border border-gray-600 hover:border-white text-white rounded-md transition-colors"
                target="_blank"
              >
                <span class="flex items-center">
                  <span>GitHub</span>
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-card {
  transform-style: preserve-3d;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.project-image-container {
  transform: translateZ(20px);
  overflow: hidden;
}

.project-card:hover .project-image-container img {
  transform: scale(1.1);
}

.glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 80%
  );
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, -50%);
  z-index: 2;
  mix-blend-mode: overlay;
}
</style>
