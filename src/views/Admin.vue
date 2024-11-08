<template>
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-6">Admin Panel</h1>

        <section class="mb-10">
            <h2 class="text-2xl font-semibold mb-4">Manage Notices</h2>
            <button @click="showNoticeForm = !showNoticeForm" class="bg-blue-500 text-white px-4 py-2 rounded">
                {{ showNoticeForm ? "Cancel" : "Add Notice" }}
            </button>

            <div v-if="showNoticeForm" class="my-4 p-4 bg-gray-100 rounded">
                <input v-model="newNotice.title" placeholder="Title" class="p-2 border rounded w-full mb-2" />
                <textarea v-model="newNotice.content" placeholder="Content"
                    class="p-2 border rounded w-full mb-2"></textarea>
                <button @click="addNotice" class="bg-green-500 text-white px-4 py-2 rounded">Save Notice</button>
            </div>
            <div v-if="notices.length > 0">
                <div v-for="notice in notices" :key="notice._id" class="my-4 p-4 bg-gray-100 rounded">
                    <h3 class="text-xl font-semibold">{{ notice.title }}</h3>
                    <p>{{ notice.content }}</p>
                    <button @click="deleteNotice(notice._id)" class="bg-red-500 text-white px-4 py-2 mt-2 rounded">
                        Delete
                    </button>
                </div>
            </div>
            <p v-else class="text-gray-500 mt-4">Loading notices or no notices available.</p>
        </section>
        <section>
            <h2 class="text-2xl font-semibold mb-4">Manage Schedule</h2>
            <button @click="showScheduleForm = !showScheduleForm" class="bg-blue-500 text-white px-4 py-2 rounded">
                {{ showScheduleForm ? "Cancel" : "Add Schedule" }}
            </button>

            <div v-if="showScheduleForm" class="my-4 p-4 bg-gray-100 rounded">
                <input v-model="newSchedule.title" placeholder="Title" class="p-2 border rounded w-full mb-2" />
                <textarea v-model="newSchedule.content" placeholder="Content"
                    class="p-2 border rounded w-full mb-2"></textarea>
                <input v-model="newSchedule.date" type="date" class="p-2 border rounded w-full mb-2" />
                <button @click="addSchedule" class="bg-green-500 text-white px-4 py-2 rounded">Save Schedule</button>
            </div>

            <div v-for="schedule in schedules" :key="schedule._id" class="my-4 p-4 bg-gray-100 rounded">
                <h3 class="text-xl font-semibold">{{ schedule.title }}</h3>
                <p>{{ schedule.content }}</p>
                <p>{{ formatDate(schedule.date) }}</p>
                <button @click="deleteSchedule(schedule._id)" class="bg-red-500 text-white px-4 py-2 mt-2 rounded">
                    Delete
                </button>
            </div>
        </section>
    </div>
</template>



<script>

import api from "@/plugins/axios";

export default {
    data() {
        return {
            notices: [],
            schedules: [],
            showNoticeForm: false,
            showScheduleForm: false,
            newNotice: { title: "", content: "", author: "경기고등학교 방송부" },
            newSchedule: { title: "", content: "", date: "", author: "경기고등학교 방송부" },
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
        async fetchSchedules() {
            try {
                const response = await api.get("/schedules");
                this.schedules = response.data;
            } catch (error) {
                console.error("Failed to load schedules:", error);
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
        async addSchedule() {
            try {
                await api.post("/schedules", this.newSchedule);
                this.fetchSchedules(); // 업데이트된 목록 가져오기
                this.newSchedule = { title: "", content: "", date: "" }; // 입력 초기화
                this.showScheduleForm = false;
            } catch (error) {
                console.error("Failed to add schedule:", error);
            }
        },
        async deleteSchedule(id) {
            try {
                await api.delete(`/schedules/${id}`);
                this.fetchSchedules(); // 업데이트된 목록 가져오기
            } catch (error) {
                console.error("Failed to delete schedule:", error);
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
    },
    created() {
        this.fetchNotices();
        this.fetchSchedules();
    },
};
</script>