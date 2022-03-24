<script setup>
import Weeks from "../components/Weeks.vue";
defineProps({
    recipes: {
        type: Array,
        required: false,
        default: []
    }
})
</script>

<template>
    <div id="calendar" class="container">
        <div class="row">
            <label for="nbWeek">Number of weeks</label>
            <select
                name=""
                id="nbWeek"
                class="browser-default"
                v-model="this.nbWeeks"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
        <Weeks :nbWeeks="parseInt(this.nbWeeks,10)"></Weeks>
    </div>
</template>

<script>
export default {
    created() {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push("/signup");
            M.toast({
                html: "You need to be logged in to access this page !",
                classes: "rounded",
            });
        } else {
            this.username = this.$store.getters.getUser.username;
            this.id = this.$store.getters.getUser.user_id;
        }
    },
    data() {
        return {
            nbWeeks: 1,
        };
    },
    components: { Weeks }
};
</script>

<style scoped>
.row {
    text-align: center;
}
</style>
