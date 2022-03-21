<script setup>
import Weeks from "../components/Weeks.vue";
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
        <Weeks :nbWeeks="this.nbWeeks"></Weeks>
    </div>
</template>

<script>
export default {
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
