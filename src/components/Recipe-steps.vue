<script setup>
import { defineProps } from 'vue';
defineProps({
    steps: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="col s12 m9 xl10">
        <div class="step" v-for="(step, index) of this.steps" :key="index">
            <div class="divider"></div>
            <h5>Step n°{{ index + 1 }}</h5>
            {{ step }}
        </div>
    </div>
</template>