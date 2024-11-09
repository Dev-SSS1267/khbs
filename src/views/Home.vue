<template>
  <div class="relative h-screen overflow-hidden">
    <!-- 오버레이 -->
    <div class="absolute inset-0 bg-black opacity-80 z-10"></div>

    <!-- 비디오 배경 -->
    <video class="object-cover w-full h-full inset-0 z-0" autoplay muted loop playsinline id="intro">
      <source src="https://cdn.lunaiz.com/kghs/khbs_bg.mp4" type="video/mp4">
    </video>

    <!-- 텍스트 오버레이 -->
    <div class="absolute inset-0 flex flex-col items-center justify-center z-20">
      <p class="text-white text-4xl leading-normal md:text-5xl break-keep font-bold text-center">
        Kyunggi High Broadcasting System
      </p>

      <!-- 방송일정 카드 그리드 -->
      <p class="mt-[7.5rem] text-xl font-semibold">예정된 방송일정</p>
      <div class="flex flex-wrap justify-center mt-[2rem] gap-4 max-w-screen-lg">
        <div
          v-for="schedule in nearestSchedules"
          :key="schedule._id"
          class="bg-gray-800 bg-opacity-90 rounded-lg py-3 px-6 shadow-lg w-80 md:w-60">
          <p class="md:text-lg text-base break-keep text-gray-400">{{ formatDate(schedule.date) }}<span v-if="schedule.period"> &nbsp; {{ schedule.period }}교시</span></p>
          <h3 class="text-base md:text-lg font-bold text-gray-200 mt-1 mb-3">{{ schedule.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/axios";

export default {
  data() {
    return {
      schedules: [],
      nearestSchedules: [],
    };
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
    },
    async fetchSchedules() {
      try {
        const response = await api.get("/schedules");
        this.schedules = response.data;

        // 날짜 순으로 정렬
        this.schedules.sort((a, b) => new Date(a.date) - new Date(b.date));

        // 현재 날짜 이후의 가장 임박한 일정 4개 추출
        const currentDate = new Date();
        this.nearestSchedules = this.schedules
          .filter(schedule => new Date(schedule.date) >= currentDate)
          .slice(0, 4);
      } catch (error) {
        console.error("Failed to load schedules:", error);
      }
    },
  },
  created() {
    this.fetchSchedules();
  },
};
</script>

<style scoped>
/* 필요한 스타일 추가 가능 */
</style>
