<script setup>
import Searchbar from "../components/Searchbar.vue";
import List from "../components/List.vue";

defineProps({
	user: {
		type: Object,
		required: false
	}
})
</script>

<template>
    <div class="row">
        <Searchbar></Searchbar>
        <List :id="1"></List>
    </div>
</template>

<script></script>

<style></style>
