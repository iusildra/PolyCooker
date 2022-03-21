<script setup>
defineProps({});
</script>

<template>
    <div class="search col s12 m3 l2 xl2">
        <form id="searchRecipe" @submit.prevent="onSubmit">
            <h5>Search</h5>
            <div class="searchElement">
                <label for="author_search">Author</label>
                <input
                    type="text"
                    id="author_search"
                    v-model="this.authorSearch"
                />
            </div>
            <div class="searchElement">
                <label for="recipe_search">Recipe</label>
                <input
                    type="text"
                    id="recipe_search"
                    v-model="this.recipeSearch"
                />
            </div>
            <div class="searchElement">
                <label for="ingredients_search">Ingredient</label>
                <input
                    type="text"
                    id="ingredients_search"
                    placeholder="Separate with space"
                    v-model="this.ingredientsSearch"
                />
            </div>
            <div class="searchElement input-field">
                <select id="season_select" v-model="this.season">
                    <option value="-1" selected>All</option>
                    <option
                        v-for="season of this.seasons"
                        :value="season['season_id']"
                        :key="season['season_id']"
                    >
                        {{ season["season_name"] }}
                    </option>
                </select>
                <label for="season_select">Season</label>
            </div>
            <div class="searchElement input-field">
                <select id="type_select" v-model="this.type">
                    <option value="-1" selected>All</option>
                    <option
                        v-for="type of this.types"
                        :value="type['type_id']"
                        :key="type['type_id']"
                    >
                        {{ type["type_name"] }}
                    </option>
                </select>
                <label for="type_select">Type</label>
            </div>
            <div class="searchElement input-field">
                <select id="diet_select" v-model="this.diet">
                    <option value="-1" selected>All</option>
                    <option
                        v-for="diet of this.diets"
                        :value="diet['diet_id']"
                        :key="diet['diet_id']"
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
        <div class="divider"></div>
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
        </div>
    </div>
</template>

<script>
import axios from "axios"

M.AutoInit();
axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
export default {
    mounted() {
        this.fetchOptions(() => {
            var elems = document.querySelectorAll("select");
            M.FormSelect.init(elems, {});
        });
    },
    data() {
        return {
            seasons: [],
            types: [],
            diets: [],
            authorSearch: "",
            recipeSearch: "",
            ingredientsSearch: "",
            season: 0,
            type: 0,
            diet: 0,
        };
    },
    methods: {
        onSubmit() {
            const search = {
                author: this.authorSearch,
                recipe: this.recipeSearch,
                ingredients: this.ingredientsSearch.split(" "),
                seasonID: parseInt(this.season, 10),
                typeID: parseInt(this.type, 10),
                diet: parseInt(this.diet, 10),
            };
            this.$emit("searchRecipes", search);
        },
        async fetchOptions(callback) {
            await axios
                .get("http://localhost:3080/api/seasons")
                .then((response) => (this.seasons = response.data));
            await axios
                .get("http://localhost:3080/api/types")
                .then((response) => (this.types = response.data));
            await axios
                .get("http://localhost:3080/api/diets")
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
.searchElement {
    padding: 0px 10px;
    text-align: left;
    color: black;
}

.search {
    border-right: 1px solid black;
}
.input-field {
    margin-top: 20px;
}

.submit {
    text-align: center;
    margin: 20px 0px 15px;
}

#authorsList {
    max-height: 400px;
}
</style>
