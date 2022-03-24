<script setup>
import Searchbar from "../components/Searchbar.vue";
import List from "../components/List.vue";
defineProps({
    recipes: {
        type: Array,
        required: true,
        default: [],
    },
});
</script>

<template>
    <div class="row">
        <Searchbar
            @searchRecipes="searchRecipes"
            :personalPage="true"
        ></Searchbar>
        <List :recipes="this.recipes" @recipeChosen="recipeChosen"></List>
    </div>
</template>

<script>
export default {
    mounted() {
        this.fetchRecipes();
    },
    data() {
        return {};
    },
    methods: {
        searchRecipes: function (search) {
            this.$emit("searchRecipes", search, ""); //Empty id
        },
        fetchRecipes: function () {
            this.$emit("listReady", ""); //Empty id
        },
        recipeChosen(id) {
            this.$emit("recipeChosen", id);
        },
    },
};
</script>
