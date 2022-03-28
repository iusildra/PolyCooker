<script setup>
import { defineProps } from 'vue';
import axios from "axios";
defineProps({
    recipes: {
        type: Array,
        required: true,
    },
    personalPage: {
        type: Boolean,
        required: true,
    },
});
</script>
<template>
    <div
        class="col s12 m6 l4 xl3"
        v-for="recipe of this.recipes"
        :key="recipe['recipe_id']"
    >
        <div class="card hoverable">
            <router-link :to="'/recipe/' + recipe.recipe_id" target="_blank">
                <div class="card-image">
                    <img
                        src="../assets/img/food.png"
                        :alt="recipe.name + '\'s picture'"
                    />
                </div>
                <div class="card-content">
                    <span class="card-title center">{{
                        recipe["recipe_name"]
                    }}</span>
                    <p class="center">{{ recipe["username"] }}</p>
                    <p class="center">
                        Difficulty : {{ recipe["recipe_difficulty"] }} / 5
                    </p>
                    <p class="center">
                        Cost :
                        {{ recipe["recipe_cost"] }} / 5
                    </p>
                    <p class="center">Season : {{ recipe["season_name"] }}</p>
                    <p class="center">Type : {{ recipe["type_name"] }}</p>
                    <p class="center">Diet : {{ recipe["diet_name"] }}</p>
                </div>
            </router-link>
            <div class="card-action" v-if="this.getters.isLoggedIn">
                <button
                    type="button"
                    class="waves-effect waves-light btn red"
                    @click="deleteRecipe(recipe)"
                    v-if="personalPage"
                >
                    Remove
                </button>
                <button
                    type="button"
                    class="waves-effect waves-light btn add"
                    @click="addCalendar(recipe.recipe_id, recipe.recipe_name)"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../config/config.json";
import M from "materialize-css";
export default {
    data() {
        return {
            getters: this.$store.getters,
        };
    },
    methods: {
        addCalendar(id, name) {
            this.$emit("addCalendar", id, name);
            M.toast({
                html: "Recipe has been added to your calendar !",
                classes: "rounded",
            });
        },
        deleteRecipe(recipe) {
            let confirm = prompt(
                "Please enter the name of the recipe to confirm its deletion"
            );
            if (confirm != recipe.recipe_name) return;
            axios
                .delete(api.api_routes.recipeById + recipe.recipe_id)
                .then((response) => {
                    M.toast({
                        html: response.data.msg,
                        classes: "rounded",
                    });
                    this.$emit("removeRecipe", recipe);
                })
                .catch((err) => {
                    M.toast({
                        html: err.response.data.msg,
                        class: "rounded",
                    });
                    if (err.response.status == 403) {
                        this.$router.push("/signin");
                    }
                });
        },
    },
};
</script>

<style scoped>
img {
    width: 100%;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
}

.card .card-action {
    display: flex;
    padding: 16px 0px;
    justify-content: space-evenly;
}

.card .card-title {
    font-size: large;
    text-decoration: underline;
}

.modal-trigger {
    color: black;
}
.add {
    background-color: #019dde;
}

.col {
    margin: 5px auto;
}

router-link,
a {
    text-decoration: none;
    color: black;
}
</style>
