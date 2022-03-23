<script setup></script>

<template>
    <div class="container">
        <form id="createRecipe" @submit.prevent="onSubmit">
            <h3>Add a new recipe</h3>
            <div class="row">
                <div class="col s12 m4">
                    <label for="recipe_name">Recipe</label>
                    <input
                        type="text"
                        id="recipe_name"
                        v-model="this.recipeSearch"
                    />
                </div>
                <div class="col s12 m4">
                    <label for="nbPersons">Number of persons</label>
                    <input
                        type="number"
                        id="nbPersons"
                        v-model="this.ingredientsSearch"
                        min="0"
                    />
                </div>
				<div class="col s12 m4">
                    <label for="duration">Duration (min)</label>
                    <input
                        type="number"
                        id="duration"
                        v-model="this.ingredientsSearch"
                        min="0"
                    />
                </div>
            </div>
			<div class="divider"></div>
            <div class="row">
                <div class="input-field col s12 m4">
                    <select id="season_select" v-model="this.season">
                        <option value="0" selected>All</option>
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
                <div class="input-field col s12 m4">
                    <select id="type_select" v-model="this.type">
                        <option value="0" selected>All</option>
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
                <div class="input-field col s12 m4">
                    <select id="diet_select" v-model="this.diet">
                        <option value="0" selected>All</option>
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
            </div>
			<div class="divider"></div>
			<div class="row">
				
			</div>
			<div class="divider"></div>
			<div class="input-field col s12 m10">
				<textarea id="recipe_steps"></textarea>
				<label for="recipe_steps">Steps</label>
			</div>
			<div class="divider"></div>
			<div class="row">
				<div class="input-field col s6">
					<h6>Difficulty</h6>
					<input type="range" id="difficulty" min="0.5" max="5" step="0.5" v-model="this.difficulty" oninput="this.nextElementSibling.innerHTML=this.value+' / 5'">
					<p name="value"></p>
				</div>
				<div class="input-field col s6">
					<h6>Cost</h6>
					<input type="range" id="cost" min="0.5" max="5" step="0.5" v-model="this.cost" oninput="this.nextElementSibling.innerHTML=this.value +' / 5'">
					<p name="value"></p>
				</div>
			</div>
            <div class="submit">
                <button class="btn waves-effect waves-light" type="submit">
                    Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
M.AutoInit();
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
            recipeSearch: "",
            ingredientsSearch: [],
            season: 0,
            type: 0,
            diet: 0,
			difficulty: 3,
			cost: 3,
        };
    },
    methods: {
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
#createRecipe {
    max-width: 1000px;
    text-align: center;
    padding: 50px;
    margin: 50px auto;
    border: 1px solid black;
}

div .divider {
	margin-bottom: 25px;
}

#recipe_steps {
	min-height: 150px;
	height: 250px;
	max-width: 100%;
}
</style>
