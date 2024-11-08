<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="username">Username</label>
            <input
              v-model="username"
              id="username"
              type="text"
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="password">Password</label>
            <input
              v-model="password"
              id="password"
              type="password"
              required
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-600"
          >
            Login
          </button>
          <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/plugins/axios";
  
  export default {
    data() {
      return {
        username: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await api.post("/auth/login", {
            username: this.username,
            password: this.password,
          });
          const token = response.data.token;
          localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
          this.$router.push({ name: "Home" }); // 로그인 후 홈으로 이동
        } catch (error) {
          this.errorMessage = "Invalid username or password.";
          console.error("Login failed:", error);
        }
      },
    },
  };
  </script>
  