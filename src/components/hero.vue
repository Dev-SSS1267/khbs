<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  maxFontSize: {
    type: String,
    default: '2.5rem'
  },
  minFontSize: {
    type: String,
    default: '2rem'
  }
});

const windowWidth = ref(window.innerWidth);

// 화면 크기에 따라 글씨 크기 계산
const responsiveFontSize = computed(() => {
  if (windowWidth.value < 640) return props.minFontSize; // 모바일 화면에서 최소 크기 적용
  return props.maxFontSize; // 기본 큰 글씨
});

// 창 크기 조정 시 업데이트
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

<template>
  <div class="container max-w-screen-xl flex flex-col flex-wrap items-center justify-between mx-auto py-[7.5rem]">
    <div class="mx-auto flex items-center">
      <h1
        :style="{ fontSize: responsiveFontSize }"
        class="block mb-4 leading-none tracking-tight text-white font-bold whitespace-nowrap">
        <slot name="head-txt"></slot>
      </h1>
    </div>
  </div>
</template>