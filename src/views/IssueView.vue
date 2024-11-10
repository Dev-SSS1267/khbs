<script setup>
import hero from '@/components/hero.vue';
import api from '@/plugins/axios';  // axios 인스턴스를 가져옵니다.
import moment from 'moment';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

const issue = ref({});
const route = useRoute();

const formattedDate = (createdAt) => {
    const date = moment(createdAt);
    const hours = date.hours();
    const ampm = hours < 12 ? '오전' : '오후';
    return `${date.format('YYYY년 MM월 DD일')} ${ampm} ${hours % 12 || 12}시 ${date.minutes()}분`;
};

// API 데이터를 기반으로 meta 정보를 동적으로 업데이트
const updateMetaTags = () => {
    if (issue.value.title) {
        useHead({
            title: `${issue.value.title} | 경기고등학교 방송부`,
            meta: [
                { property: 'og:title', content: issue.value.title },
                { property: 'og:description', content: issue.value.content.substring(0, 100) },
                { property: 'og:url', content: window.location.href }
            ]
        });
    }
};

// 공지사항 데이터를 API에서 가져오는 함수
const fetchNotice = async () => {
    const issueId = route.params.id;
    try {
        const response = await api.get(`/issues/${issueId}`);
        issue.value = response.data;
        updateMetaTags(); // 데이터를 기반으로 meta 태그 업데이트
    } catch (error) {
        console.error('Error fetching the issue:', error);
    }
};

onMounted(fetchNotice);
</script>

<template>
    <hero>
        <template #head-txt>문의</template>
    </hero>
    <main class="container max-w-screen-md mx-auto p-6">
        <!-- 제목 -->
        <h1 class="text-2xl md:text-3xl font-bold text-start mb-4 break-words">{{ issue.title }}</h1>

        <!-- 작성자와 날짜 -->
        <div class="text-base md:text-lg text-gray-400 mb-4 flex items-center">
            <span class="font-semibold">{{ issue.location }}</span>
            <span class="mx-3">|</span>
            <span>{{ formattedDate(issue.createdAt) }}</span>
        </div>
        <hr class="h-px border-0 mb-4 bg-gray-700">
        <p class="my-4 text-lg font-semibold">문의 내용</p>
        <!-- 구분선 -->
        <hr class="h-px border-0 mb-10 bg-gray-700">

        <!-- 내용 -->
        <p class="text-lg leading-relaxed whitespace-pre-wrap break-keep text-gray-300" v-html="issue.description">
        </p>

        <hr class="h-px border-0 mb-4 mt-10 bg-gray-700">
        <p class="my-4 text-lg font-semibold">문의 답변</p>
        <!-- 구분선 -->
        <hr class="h-px border-0 mb-10 bg-gray-700">
        <!-- 내용 -->
        <p class="text-lg leading-relaxed whitespace-pre-wrap break-keep text-gray-300" v-if="issue.response">
            {{ issue.response }}
        </p>
        <p class="text-lg leading-relaxed whitespace-pre-wrap break-keep text-gray-300" v-else>
            답변이 아직 작성되지 않았습니다.</p>
    </main>
</template>
