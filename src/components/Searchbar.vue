<script setup>
defineProps({
    personalPage: {
        type: Boolean,
        required: true,
    },
});
</script>

<template>
    <div class="search col s12 m3 l3 xl2">
        <form id="searchRecipe" @submit.prevent="onSubmit">
            <h5>Search</h5>
            <div class="input-field" v-if="personalPage">
                <input
                    type="text"
                    id="author_search"
                    v-model="this.authorSearch"
                />
                <label for="author_search" class="caption">Author</label>
            </div>
            <div class="input-field">
                <input
                    type="text"
                    id="recipe_search"
                    v-model="this.recipeSearch"
                />
                <label for="recipe_search">Recipe</label>
            </div>
            <div class="input-field">
                <div id="ingredient_chips" class="chips">
                    <input
                        id="ingredients_search"
                        class="autocomplete"
                        placeholder="Enter a tag"
                        @input="getAutoComplete"
                        autocomplete="off"
                    />
                </div>
                <label for="ingredients_search">Ingredient</label>
            </div>
            <div class="input-field">
                <select id="season_select" v-model="this.season">
                    <option value="" selected>All</option>
                    <option
                        v-for="season of this.seasons"
                        :value="season['season_name']"
                        :key="season['season_name']"
                    >
                        {{ season["season_name"] }}
                    </option>
                </select>
                <label for="season_select">Season</label>
            </div>
            <div class="input-field">
                <select id="type_select" v-model="this.type">
                    <option value="" selected>All</option>
                    <option
                        v-for="type of this.types"
                        :value="type['type_name']"
                        :key="type['type_name']"
                    >
                        {{ type["type_name"] }}
                    </option>
                </select>
                <label for="type_select">Type</label>
            </div>
            <div class="input-field">
                <select id="diet_select" v-model="this.diet">
                    <option value="" selected>All</option>
                    <option
                        v-for="diet of this.diets"
                        :value="diet['diet_name']"
                        :key="diet['diet_name']"
                    >
                        {{ diet["diet_name"] }}
                    </option>
                </select>
                <label for="diet_select">Diet</label>
            </div>
            <div class="submit">
                <button class="btn waves-effect waves-light" type="submit">
                    Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
        <!-- <div class="divider"></div>
        <div>
            <h6>Author(s)</h6>
            <div class="col s12" id="recipe_list">
                <ul class="pagination">
                    <li class="waves-effect">
                        <a><i class="material-icons">chevron_left</i></a>
                    </li>
                    <li class="waves-effect">
                        <a><i class="material-icons">chevron_right</i></a>
                    </li>
                </ul>
                <div id="authorsList"></div>
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from "axios";
import api from "../config/config.json"

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default {
    mounted() {
        this.fetchOptions(() => {
            M.AutoInit();
        });
    },
    data() {
        return {
            seasons: [],
            types: [],
            diets: [],
            authorSearch: "",
            recipeSearch: "",
            season: "",
            type: "",
            diet: "",
        };
    },
    methods: {
        getAutoComplete() {
            let input = document.getElementById("ingredients_search");
            const value = input.value;
            if (value.length >= 3) {
                axios
                    .get(api.api_routes.ingredientsByName + value)
                    .then((response) => {
                        let results = response.data
                            .map((elt) => `"${elt["ingredient_name"]}":""`)
                            .join();
                        results = "{" + results + "}";
                        let instance = M.Autocomplete.getInstance(input);
                        instance.updateData(JSON.parse(results));
                    });
            }
        },
        getIngredients() {
            let chips = document.querySelectorAll(".chip");
            let ingredients = [];
            chips.forEach((elt) => {
                ingredients.push(elt.innerHTML.split("<")[0]); //Split to exclude the icon inside the chip
            });
            return ingredients;
        },
        onSubmit() {
            let search = {};
            let ingredients = this.getIngredients();
            if (this.authorSearch.length > 0)
                search["author"] = this.authorSearch;
            if (this.recipeSearch.length > 0)
                search["recipe"] = this.recipeSearch;
            if (ingredients.length > 0) search["ingredients"] = ingredients;
            if (this.season.length > 0)
                search["seasonID"] = this.season;
            if (this.type.length > 0)
                search["typeID"] = this.type;
            if (this.diet.length > 0)
                search["dietID"] = this.diet;
            this.$emit("searchRecipes", search);
        },
        async fetchOptions(callback) {
            await axios
                .get(api.api_routes.seasons)
                .then((response) => (this.seasons = response.data));
            await axios
                .get(api.api_routes.types)
                .then((response) => (this.types = response.data));
            await axios
                .get(api.api_routes.diets)
                .then((response) => (this.diets = response.data));
            callback();
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
}

.search {
    border-right: 1px solid black;
}
.input-field {
    margin-top: 20px;
}

.submit {
    text-align: center;
    margin: 0px 0px 15px;
}

.input-field {
    text-align: left;
}

#authorsList {
    max-height: 400px;
}

#ingredient_chips {
    padding-top: 10px;
}
</style>
