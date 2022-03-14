<script setup>
defineProps({
	seasons: {
		//Array with the name and id of each season
		type: Array,
		required: true,
	},
	types: {
		//Array with the name and id of each type
		type: Array,
		required: true,
	},
	diets: {
		//Array with the name and id of each diet
		type: Array,
		required: true,
	},
});
</script>

<template>
	<form id="searchRecipe" class="col s12 m3 l2 xl2" @submit.prevent="onSubmit">
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
			<select id="season_select" v-model="this.season">
				<option value="-1" selected>All</option>
				<option v-for="season of this.seasons" :value="season.id" :key="season.id">
					{{ capitalize(season.name) }}
				</option>
			</select>
			<label for="season_select">Season</label>
		</div>
		<div class="searchElement input-field">
			<select id="type_select" v-model="this.type">
				<option value="-1" selected>All</option>
				<option v-for="type of this.types" :value="type.id" :key="type.id">
					{{ capitalize(type.name) }}
				</option>
			</select>
			<label for="type_select">Type</label>
		</div>
		<div class="searchElement input-field">
			<select id="diet_select" v-model="this.diet">
				<option value="-1" selected>All</option>
				<option v-for="diet of this.diets" :value="diet.id" :key="diet.id">
					{{ capitalize(diet.name) }}
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
export default {
	data() {
		return {
			authorSearch: "",
			recipeSearch: "",
			ingredientsSearch: "",
			season: 0,
			type: 0,
			diet: 0,
		};
	},
	methods: {
		capitalize(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		onSubmit() {
			const search = {
				author: this.authorSearch,
				recipe: this.recipeSearch,
				ingredients: this.ingredientsSearch.split(" "),
				seasonID: this.season,
				typeID: this.type,
				diet: this.diet,
			};
			console.log(search);
			this.$emit("searchRecipes", search);
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

.input-field {
	margin-top: 20px;
}


.submit {
	text-align: center;
}
</style>
