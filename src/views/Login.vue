<template>
    <div class="flex items-center justify-center min-h-[50vh] ">
      <div class="p-8 rounded shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-4 text-center">관리자 로그인</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-100 mb-2" for="username">아이디</label>
            <input
              v-model="username"
              id="username"
              type="text"
              required
              placeholder="아이디를 입력하세요"
              class="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-100 mb-2" for="password">비밀번호</label>
            <input
              v-model="password"
              id="password"
              type="password"
              required
                placeholder="비밀번호를 입력하세요"
              class="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-600"
          >
            로그인
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
  