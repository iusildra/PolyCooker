<script setup>
import Searchbar from "../components/App-searchbar.vue";
import List from "../components/Recipes-list.vue";
import { defineProps } from 'vue';
defineProps({
    recipes: {
        type: Array,
        required: true,
        default: () => [],
    },
});
</script>

<template>
    <main>
        <div class="row">
            <Searchbar
                @searchRecipes="searchRecipes"
                :personalPage="false"
            ></Searchbar>
            <List
                :recipes="this.recipes"
                :personalPage="true"
                :offset="this.offset"
                :limit="this.limit"
                @recipeChosen="recipeChosen"
                @removeRecipe="removeRecipe"
                @addCalendar="addCalendar"
            ></List>
        </div>
    </main>
</template>

<script>
import M from "materialize-css"
const defaultOffset = 0;
const defaultLimit = 25;
M.AutoInit();
export default {
    created() {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push("/signin");
            M.toast({
                html: "You need to be logged in to access this page !",
                classes: "rounded",
            });
        } else {
            this.username = this.$store.getters.getUser.username;
            this.id = this.$store.getters.getUser.user_id;
            this.searchRecipes({}, this.id);
        }
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
                    this.id,
                    this.offset,
                    this.limit
                );
            }
        );
    },
    data() {
        return {
            offset: defaultOffset,
            limit: defaultLimit,
            username: "",
            search: {},
            id: "",
        };
    },
    methods: {
        searchRecipes: function (search) {
            this.search = search;
            this.$emit(
                "searchRecipes",
                this.search,
                this.id,
                this.offset,
                this.limit
            );
        },
        recipeChosen(id) {
            this.$emit("recipeChosen", id);
        },
        removeRecipe(recipe) {
            this.$emit("removeRecipe", recipe);
        },
        addCalendar(id, name) {
            this.$emit("addCalendar", id, name);
        },
    },
};
</script>

<style></style>
