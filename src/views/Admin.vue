<template>
    <div class="p-3 max-w-screen-md mx-auto">
        <hero>
            <template #head-txt>관리자 페이지</template>
        </hero>
        <hr class="h-px border-0 mb-10 bg-gray-700">
        <div class="flex justify-center gap-4 mt-4">
            <button onclick="location.href='/admin/notice';" class="bg-gray-700 text-white py-20 text-xl px-4 w-full rounded-xl hover:bg-gray-800">공지사항</button>
            <button onclick="location.href='/admin/schedule';" class="bg-gray-700 text-white py-20 text-xl px-4 w-full rounded-xl hover:bg-gray-800">방송일정</button>
            <button onclick="location.href='/admin/issue';" class="bg-gray-700 text-white py-20 text-xl px-4 w-full rounded-xl hover:bg-gray-800">문의관리</button>
        </div>

    </div>
</template>



<script>
import hero from "@/components/hero.vue";
export default {
    components: {
        hero,
    },
};
</script>