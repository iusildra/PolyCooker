<script setup>
import { defineProps } from 'vue';
defineProps({
    info: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="container">
        <div>
            <img src="../assets/img/food.png" :alt="info.name +'\'s picture'" height="200">

        </div>
        <div class="chip">{{ info.author }}</div>
        <h4>{{ info.name + ' ('+info.for+'p.)'}}</h4>
        <div class="flex">
            <span
                >Duration:
                {{
                    diplayDuration(info.duration)
                }}</span
            >
            <span>Difficulty : {{ info.difficulty}} / 5</span>
            <span>Cost: {{ info.cost }} / 5</span>
        </div>
        <div class="flex">
            <span v-if="info.season != null">{{info.season}}</span>
            <span v-if="info.type != null">{{info.type}}</span>
            <span v-if="info.diet != null">{{info.diet}}</span>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        diplayDuration: (duration) => {
            if (duration > 60) {
                return duration / 60 +
                    "h" +
                    (duration - (duration / 60) * 60) +
                    "m";
            } else {
                return duration + "m"
            }
        },
    },
};
</script>

<style scoped>

.container {
    margin-top: 25px;
}
.flex {
    display: flex;
    justify-content: space-evenly;
}
</style>
