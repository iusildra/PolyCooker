<script setup>
import Searchbar from "../components/App-searchbar";
import List from "../components/Recipes-list.vue"
import { defineProps } from "vue";
defineProps({
    recipes: {
        type: Array,
        required: true,
        default: () => [],
    },
});
</script>

<template>
    <div class="row">
        <Searchbar
            @searchRecipes="searchRecipes"
            :personalPage="true"
        ></Searchbar>
        <List
            :offset="offset"
            :limit="limit"
            :recipes="recipes"
            @recipeChosen="recipeChosen"
            @addCalendar="addCalendar"
        ></List>
    </div>
</template>

<script>
const defaultOffset = 0;
const defaultLimit = 25;
export default {
    mounted() {
        this.searchRecipes({});
        this.$watch(
            () => this.$route.query,
            (toParams) => {
                this.offset = toParams.offset
                    ? parseInt(toParams.offset, 10)
                    : defaultOffset;
                this.limit = toParams.limit
                    ? parseInt(toParams.limit, 10)
                    : defaultLimit;
                this.$emit(
                    "searchRecipes",
                    this.search,
                    "",
                    this.offset,
                    this.limit
                );
            }
        );
    },
    data() {
        return {
            search: {},
            offset: defaultOffset,
            limit: defaultLimit,
        };
    },
    methods: {
        searchRecipes: function (search) {
            this.search = search;
            this.$emit("searchRecipes", search, "", this.offset, this.limit); //Empty id
        },
        recipeChosen(id) {
            this.$emit("recipeChosen", id);
        },
        addCalendar(id, name) {
            this.$emit("addCalendar", id, name);
        },
    },
};
</script>
