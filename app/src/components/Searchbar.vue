<script setup>
defineProps({});
</script>

<template>
    <form
        id="searchRecipe"
        class="col s12 m3 l2 xl2"
        @submit.prevent="onSubmit"
    >
        <h5>Search</h5>
        <div class="searchElement">
            <label for="author_search">Author</label>
            <input type="text" id="author_search" v-model="this.authorSearch" />
        </div>
        <div class="searchElement">
            <label for="recipe_search">Recipe</label>
            <input type="text" id="recipe_search" v-model="this.recipeSearch" />
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
            <select id="season_select" class="browser-default" v-model="this.season">
                <option value="-1" selected>All</option>
                <option
                    v-for="season of this.seasons"
                    :value="season['season_id']"
                    :key="season['season_id']"
                >
                    {{ season['season_name'] }}
                </option>
            </select>
            <label for="season_select">Season</label>
        </div>
        <div class="searchElement input-field">
            <select id="type_select" class="browser-default" v-model="this.type">
                <option value="-1" selected>All</option>
                <option
                    v-for="type of this.types"
                    :value="type['type_id']"
                    :key="type['type_id']"
                >
                    {{ type['type_name'] }}
                </option>
            </select>
            <label for="type_select">Type</label>
        </div>
        <div class="searchElement input-field">
            <select id="diet_select" class="browser-default" v-model="this.diet">
                <option value="-1" selected>All</option>
                <option
                    v-for="diet of this.diets"
                    :value="diet['diet_id']"
                    :key="diet['diet_id']"
                >
                    {{ diet['diet_name'] }}
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
</template>

<script>
let myHeaders = new Headers();
let get = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
};
export default {
    mounted() {
        this.fetchSeason();
        this.fetchTypes();
        this.fetchDiets();
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
                seasonID: this.season,
                typeID: this.type,
                diet: this.diet,
            };
            this.$emit("searchRecipes", search);
        },
        fetchSeason() {
            fetch("http://localhost:3080/api/seasons")
                .then((res) => res.json())
                .then((data) => (this.seasons = data));
        },
        fetchTypes() {
            fetch("http://localhost:3080/api/types")
                .then((res) => res.json())
                .then((data) => (this.types = data));
        },
        fetchDiets() {
            fetch("http://localhost:3080/api/diets")
                .then((res) => res.json())
                .then((data) => (this.diets = data));
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
    padding: 5px 0px;
    margin: 0px 10px;
    text-align: left;
    color: black;
}

#searchRecipe {
    border-right: 1px solid black;
}
.input-field {
    margin-top: 20px;
}

.submit {
    text-align: center;
}
</style>
