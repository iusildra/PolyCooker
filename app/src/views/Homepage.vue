<script setup>
import Searchbar from "../components/Searchbar.vue";
import List from "../components/List.vue";
</script>

<template>
    <div class="row">
        <Searchbar @searchRecipes="searchRecipes"></Searchbar>
        <List :searchedRecipes="this.recipes"></List>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            recipes: [],
        };
    },
    methods: {
        searchRecipes: (search) => {
            console.log(search)
            axios
                .get("localhost:3080/api/recipes", {
                    params: search,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => console.log(response))
                .catch((err) => console.log(err.json()));
        },
    },
};
</script>
