<script setup>
import Footer from "./components/App-footer.vue";
import Header from "./components/App-header.vue";
</script>

<template>
    <Header @userDeleted="updateList"></Header>
    <router-view
        :recipes="this.recipes"
        :recipe_id="this.chosenRecipe"
        :calendarRecipes="this.calendarRecipes"
        @searchRecipes="searchRecipes"
        @recipeChosen="recipeChosen"
        @removeRecipe="removeRecipe"
        @addCalendar="addCalendar"
    ></router-view>
    <Footer></Footer>
    <div id="addRecipe">
        <router-link
            to="/createrecipe"
            class="btn-floating btn-large waves-effect waves-light modal-trigger red"
            href="#createRecipe"
            v-if="getters.isLoggedIn"
            ><i class="material-icons">add</i></router-link
        >
    </div>
</template>

<script>
import api from "./config/config.json";
import axios from "axios";
export default {
    data() {
        return {
            recipes: [],
            calendarRecipes: [],
            chosenRecipe: "",
            getters: this.$store.getters,
        };
    },
    methods: {
        searchRecipes: function (search, id, offset = 0, limit = 25) {
            axios
                .get(api.api_routes.recipes, {
                    params: {
                        search: search,
                        id: id,
                        limit: limit,
                        offset: offset,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => (this.recipes = response.data))
                .catch((err) => console.log(err));
        },
        updateList(id) {
            this.recipes = this.recipes.filter(
                (elt) => elt.recipe_author != id
            );
        },
        recipeChosen(id) {
            this.chosenRecipe = id;
        },
        removeRecipe(recipe) {
            this.recipes.splice(this.recipes.indexOf(recipe), 1);
        },
        addCalendar(id, name) {
            this.calendarRecipes.push({ id, name });
        },
    },
};
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#addRecipe {
    position: fixed;
    right: 50px;
    bottom: 202px;
}
</style>
