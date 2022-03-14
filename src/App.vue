<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Searchbar from "./components/Searchbar.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
</script>

<template>
    <Header></Header>
    <div class="row">
        <Searchbar
            :seasons="this.seasons"
            :types="this.types"
            :diets="this.diets"
            @searchRecipes="research"
        ></Searchbar>
        <List></List>
    </div>
    <Footer></Footer>
</template>

<script>
export default {
    data() {
        return {
            seasons: [
                { id: 1, name: "Winter" },
                { id: 2, name: "Spring" },
                { id: 3, name: "Summer" },
                { id: 4, name: "Autumn" },
            ],
            types: [
                { id: 1, name: "Starter" },
                { id: 2, name: "Main dish" },
                { id: 3, name: "Dessert" },
            ],
            diets: [
                { id: 1, name: "Omnivorous" },
                { id: 2, name: "Vegetarian" },
                { id: 3, name: "Vegan" },
            ],
        };
    },
    methods: {
        research(search) {
            //Makes a request to the db
        }
    },
};
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
