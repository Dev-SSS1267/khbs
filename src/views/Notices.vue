<template>
    <div class="p-4">
      <h1 class="text-4xl font-bold mb-6">Notices</h1>
      <div v-for="notice in notices" :key="notice._id" class="mb-4 p-4 bg-gray-100 rounded">
        <h2 class="text-2xl font-semibold">{{ notice.title }}</h2>
        <p class="text-gray-700">{{ notice.content }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(notice.createDate) }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/plugins/axios";
  
  export default {
    data() {
      return {
        notices: [],
      };
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      async fetchNotices() {
        try {
          const response = await api.get("/notices");
          this.notices = response.data;
        } catch (error) {
          console.error("Failed to load notices:", error);
        }
      },
    },
    created() {
      this.fetchNotices();
    },
  };
  </script>
  