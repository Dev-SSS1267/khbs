<template>
    <Hero>
        <template #head-txt>공지사항 관리</template>
    </Hero>
    <section class="mb-10 max-w-screen-md mx-auto">
        <button @click="showNoticeForm = !showNoticeForm" class="bg-blue-500 text-white px-4 py-2 rounded">
            {{ showNoticeForm ? "취소" : "공지사항 등록" }}
        </button>

        <div v-if="showNoticeForm" class="my-4 p-4 bg-gray-800 rounded">
            <input v-model="newNotice.title" placeholder="제목" class="bg-gray-700 border-gray-600 p-2 border rounded w-full mb-2" />
            <textarea v-model="newNotice.content" placeholder="내용"
                class="bg-gray-700 border-gray-600 p-2 border rounded w-full mb-2"></textarea>
            <button @click="addNotice" class="bg-green-500 text-white px-4 py-2 rounded">등록하기</button>
        </div>
        <div v-if="notices.length > 0">
            <div v-for="notice in notices" :key="notice._id" class="my-4 p-4 bg-gray-800 rounded">
                <h3 class="text-xl font-semibold">{{ notice.title }}</h3>
                <p>{{ notice.content }}</p>
                <button @click="deleteNotice(notice._id)" class="bg-red-500 text-white px-3 py-2 mt-2 rounded">
                    삭제하기
                </button>
            </div>
        </div>
        <p v-else class="text-gray-500 mt-4">Loading notices or no notices available.</p>
    </section>

</template>



<script>
import Hero from "@/components/hero.vue";
import api from "@/plugins/axios";

export default {
    components: {
        Hero,
    },
    data() {
        return {
            notices: [],
            showNoticeForm: false,
            newNotice: { title: "", content: "", author: "관리자" },
        };
    },
    methods: {
        handleLogout() {
            localStorage.removeItem("token"); // 토큰 삭제
            this.$router.push({ name: "Login" }); // 로그인 페이지로 이동
        },
        async fetchNotices() {
            try {
                const response = await api.get("/notices");
                this.notices = response.data;
            } catch (error) {
                console.error("Failed to load notices:", error);
            }
        },
        async addNotice() {
            try {
                await api.post("/notices", this.newNotice);
                this.fetchNotices(); // 업데이트된 목록 가져오기
                this.newNotice = { title: "", content: "" }; // 입력 초기화
                this.showNoticeForm = false;
            } catch (error) {
                console.error("Failed to add notice:", error);
            }
        },
        async deleteNotice(id) {
            try {
                await api.delete(`/notices/${id}`);
                this.fetchNotices(); // 업데이트된 목록 가져오기
            } catch (error) {
                console.error("Failed to delete notice:", error);
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
    },
    created() {
        this.fetchNotices();
    },
};
</script>