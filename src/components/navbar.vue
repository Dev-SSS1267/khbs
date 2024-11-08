<template>
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          <routerLink to="/" class="text-white">Broadcasting Club</routerLink>
        </h1>
        <nav>
          <RouterLink to="/" class="mr-4">Home</RouterLink>
          <RouterLink to="/schedule" class="mr-4">Schedule</RouterLink>
          <RouterLink to="/notices" class="mr-4">Notices</RouterLink>
          <RouterLink to="/issue" class="mr-4">Issue</RouterLink>
          <RouterLink v-if="isAdmin" to="/admin" class="mr-4">Admin</RouterLink>
          <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useRouter, RouterLink } from "vue-router";
  
  export default {
    setup() {
      const router = useRouter();
  
      const logout = () => {
        localStorage.removeItem("token");
        router.push({ name: "Login" });
      };
  
      const isAdmin = computed(() => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        // 실제 토큰에서 isAdmin을 확인하는 로직이 필요합니다.
        return true; // 이 예제에서는 임의로 true 설정
      });
  
      return { logout, isAdmin };
    },
  };
  </script>
  
  <style scoped>
  nav a {
    color: white;
    text-decoration: none;
  }
  nav a:hover {
    text-decoration: underline;
  }
  </style>
  