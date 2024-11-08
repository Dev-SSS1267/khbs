<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
</script>

<template>
  <Navbar />
  <div class="mx-auto container md:px-[10rem]">
    <RouterView />
  </div>
  <Footer />
  
</template>

