<script setup>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
    <Header></Header>
    <router-view
        :recipes="this.recipes"
        :recipe_id="this.chosenRecipe"
        @searchRecipes="searchRecipes"
        @listReady="fetchRecipes"
        @recipeChosen="recipeChosen"
        @removeRecipe="removeRecipe"
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
import axios from "axios";
export default {
    data() {
        return {
            recipes: [],
            chosenRecipe: "",
            getters: this.$store.getters,
        };
    },
    methods: {
        searchRecipes: function (search, id, offset = 0, limit = 25) {
            if (Object.keys(search).length == 0) {
                this.fetchRecipes(id);
                return;
            }
            axios
                .get("http://localhost:3080/api/recipes", {
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
        fetchRecipes: function (id = "") {
            if (id.length == 0)
                axios
                    .get("http://localhost:3080/api/recipes/")
                    .then((response) => {
                        this.recipes = response.data;
                    });
            else
                axios
                    .get("http://localhost:3080/api/users/" + id)
                    .then((response) => {
                        this.recipes = response.data;
                    });
        },
        recipeChosen(id) {
            this.chosenRecipe = id;
        },
        removeRecipe(recipe) {
            this.recipes.splice(this.recipes.indexOf(recipe), 1)
        }
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
