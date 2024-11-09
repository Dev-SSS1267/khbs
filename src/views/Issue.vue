<template>
    <Hero>
        <template #head-txt>문의 목록</template>
    </Hero>

    <!-- 문제 신고 버튼 -->
    <div class="flex justify-center p-4 mb-[5rem]">
        <RouterLink to="/issue/report" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            문제 신고하기
        </RouterLink>
    </div>


    <h1 v-if="issues.length === 0" class="text-2xl text-center font-bold text-gray-600 dark:text-white">
      No Issues are found
    </h1>

    <main v-else class="space-y-3">
      <RouterLink v-for="issue in paginatedIssues" :key="issue._id" :to="`/issue/` + issue._id" class="block">
        <ListItem :title="issue.title" :descOne="getPreview(issue.description)"
                  :date="formattedDate(issue.createdAt)" :author="issue.location">
          <template #img>
            <div v-if="issue.banner_image" class="h-20 w-20">
              <img :src="issue.banner_image" alt="issue image"
                   class="h-full w-full object-cover rounded dark:shadow-gray-800"
                   @error="issue.banner_image = ''" />
            </div>
          </template>
        </ListItem>
      </RouterLink>

      <Pagination :totalItems="issues.length" :current-page="currentPage" :items-per-page="issuesPerPage"
                  @page-changed="changePage" class="mt-8" />
    </main>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import api from "@/plugins/axios";
import Pagination from '@/components/pagination.vue';
import ListItem from "@/components/listItem.vue";
import moment from 'moment';
import Hero from '@/components/hero.vue';

export default {
  components: {
    Pagination,
    ListItem,
    Hero
  },
  setup() {
    const issues = ref([]);
    const currentPage = ref(1);
    const issuesPerPage = 5;

    const fetchIssues = async () => {
      try {
        const response = await api.get('/issues');
        issues.value = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    const formattedDate = (createdAt) => {
      const date = moment(createdAt);
      const hours = date.hours();
      const ampm = hours < 12 ? 'AM' : 'PM';
      return `${date.format('YYYY.MM.DD.')} ${hours % 12 || 12}:${date.minutes()} ${ampm}`;
    };

    const getPreview = (description) => {
      const maxLength = 20;
      return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
    };

    const paginatedIssues = computed(() => {
      const startIndex = (currentPage.value - 1) * issuesPerPage;
      const endIndex = startIndex + issuesPerPage;
      return issues.value.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => Math.ceil(issues.value.length / issuesPerPage));

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    onMounted(fetchIssues);

    return {
      issues,
      currentPage,
      issuesPerPage,
      paginatedIssues,
      formattedDate,
      getPreview,
      changePage,
    };
  },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
