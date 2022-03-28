<script setup>
import Footer from "./components/App-footer.vue";
import Header from "./components/App-header.vue";
</script>

<template>
    <Header @userDeleted="updateList"></Header>
    <router-view
        :recipes="recipes"
        :recipe_id="chosenRecipe"
        :calendarRecipes="calendarRecipes"
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
.btn {
    overflow: hidden;
}
.btn:hover:before {
    opacity: 1;
}

.btn:before {
    content: "";
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: opacity 0.2s;
    z-index: -1;
}
</style>
