<script setup></script>

<template>
    <div class="container">
        <form id="createRecipe" @submit.prevent="onSubmit">
            <h3>Add a new recipe</h3>
            <div class="row">
                <div class="col s12 m4">
                    <label for="recipe_name">Recipe name</label>
                    <input
                        type="text"
                        id="recipe_name"
                        v-model="this.name"
                        required
                    />
                </div>
                <div class="col s12 m4">
                    <label for="nbPersons">Number of persons</label>
                    <input
                        type="number"
                        id="nbPersons"
                        v-model="this.for"
                        min="0"
                        required
                    />
                </div>
                <div class="col s12 m4">
                    <label for="duration">Duration (min)</label>
                    <input
                        type="number"
                        id="duration"
                        v-model="this.duration"
                        min="0"
                        required
                    />
                </div>
            </div>
            <div class="divider"></div>
            <div class="row">
                <div class="input-field col s12 m4">
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
                <div class="input-field col s12 m4">
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
                <div class="input-field col s12 m4">
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
            </div>
            <div class="divider"></div>
            <h5>Ingredients</h5>
            <div id="ingredients" class="row">
                <div
                    class="ingredient col s12 m5 xl3 z-depth-1 valign-wrapper"
                    v-for="(ingredient, i) of this.ingredients"
                    :key="i"
                >
                    <div class="col s8">
                        {{
                            ingredient.name +
                            " : " +
                            ingredient.quantity +
                            ingredient.unit
                        }}
                    </div>
                    <div class="col s2">
                        <button
                            type="button"
                            id="addIngredient"
                            class="btn-small red"
                            @click="deleteIngredient(ingredient)"
                        >
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="addIngredient" class="row input-field z-depth-1">
                <div class="col s12 m6 l4">
                    <label for="ingr_name">Name</label>
                    <input
                        type="text"
                        id="ingr_name"
                        class="autocomplete"
                        autocomplete="off"
                        @input="getAutoComplete()"
                    />
                </div>
                <div class="col s12 m3 l4">
                    <label for="ingr_quantity">Quantity</label>
                    <input type="number" id="ingr_quantity" />
                </div>
                <div class="col s12 m3 l4">
                    <label for="ingr_unit">Unit</label>
                    <select id="ingr_unit">
                        <option value="" selected disabled>Unit</option>
                        <option
                            v-for="(unit, i) of units"
                            :key="i"
                            :value="unit.unit_name"
                        >
                            {{ unit.unit_name }}
                        </option>
                    </select>
                </div>
                <div class="col s12" id="ingr_actions">
                    <div class="col s8">
                        <button
                            type="button"
                            data-target="modal_addIngr"
                            class="btn waves-effect waves-light materialize-red lighten-2 modal-trigger"
                        >
                            Missing ingredient ?
                        </button>
                    </div>
                    <div class="col s4">
                        <button
                            type="button"
                            class="btn waves-effect waves-light blue"
                            @click="addIngredient"
                        >
                            <i class="material-icons">add</i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="modal_addIngr" class="modal">
                <div class="modal-content">
                    <h4>New ingredient</h4>
                    <div class="input-field">
                        <input type="text" id="ingredient_name" />
                        <label for="ingredient_name">Name</label>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <select id="ingredient_season">
                                <option value="" selected>All</option>
                                <option
                                    :value="season.season_name"
                                    v-for="season of this.seasons"
                                >
                                    {{ season.season_name }}
                                </option>
                            </select>
                        </div>
                        <div class="input-field col s6">
                            <label>
                                <input type="checkbox" id="is_allergen" />
                                <span>Allergen ?</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="modal-close waves-effect waves-green btn-flat"
                        @click="newIngredient"
                    >
                        Validate
                    </button>
                </div>
            </div>
            <div class="divider"></div>
            <div class="input-field col s12 m10">
                <h5>Steps (separate with double LF)</h5>
                <textarea id="recipe_steps"></textarea>
            </div>
            <div class="divider"></div>
            <div class="row">
                <div class="input-field col s6">
                    <h6>Difficulty</h6>
                    <input
                        type="range"
                        id="difficulty"
                        min="0"
                        max="5"
                        step="0.5"
                        v-model="this.difficulty"
                    />
                    <p name="value">{{ this.difficulty }} / 5</p>
                </div>
                <div class="input-field col s6">
                    <h6>Cost</h6>
                    <input
                        type="range"
                        id="cost"
                        min="0"
                        max="5"
                        step="0.5"
                        v-model="this.cost"
                    />
                    <p name="value">{{ this.cost }} / 5</p>
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
import api from "../config/config.json";
import M from "materialize-css"
import axios from "axios";
export default {
    created() {
        this.fetchOptions(() => {
            M.AutoInit();
            M.Autocomplete.init(document.querySelectorAll("#ingr_name"), {
                data: {},
                limit: Infinity,
                minLength: 1,
            });
        });
    },
    data() {
        return {
            seasons: [],
            types: [],
            diets: [],
            units: [],
            name: "",
            for: 0,
            duration: 0,
            season: "",
            type: "",
            diet: "",
            ingredients: [],
            difficulty: 0,
            cost: 0,
            count: 0,
        };
    },
    methods: {
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
            await axios
                .get(api.api_routes.units)
                .then((response) => (this.units = response.data));
            callback();
        },

        onSubmit() {
            if (this.ingredients.length == 0) {
                M.toast({
                    html: "You must give at least one ingredient !",
                    classes: "rounded",
                });
                return;
            }
            if (document.getElementById("recipe_steps").value.length == 0) {
                M.toast({
                    html: "You must give at least one step !",
                    classes: "rounded",
                });
                return;
            }
            const add = {
                author: this.$store.getters.getUser.user_id,
                name: this.name,
                for: this.for,
                duration: this.duration,
                season: this.season,
                type: this.type,
                diet: this.diet,
                ingredients: this.ingredients,
                steps: document.getElementById("recipe_steps").value,
                difficulty: this.difficulty,
                cost: this.cost,
            };
            axios
                .post(api.api_routes.recipes, add)
                .then((response) => M.toast({ html: response.data.msg }))
                .catch((err) => {
                    M.toast({ html: err.response.data.msg });
                });
        },
        getAutoComplete() {
            let input = document.getElementById("ingr_name");
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
        addIngredient() {
            const name = document.getElementById("ingr_name").value;
            const quantity = document.getElementById("ingr_quantity").value;
            const unit = document.getElementById("ingr_unit").value;
            console.log(name, quantity, unit);
            if (name.length == 0 || quantity == 0 || unit.length == 0) {
                M.toast({
                    html: "Please provide correct inputs !",
                    classes: "rounded",
                });
            } else {
                this.ingredients.push({
                    name,
                    quantity,
                    unit,
                });
            }
            console.log(this.ingredients);
        },
        deleteIngredient(ingr) {
            this.ingredients.splice(this.ingredients.indexOf(ingr), 1);
        },
        async newIngredient() {
            const add = {
                ingredient_name:
                    document.getElementById("ingredient_name").value,
                ingredient_season:
                    document.getElementById("ingredient_season").value,
                is_allergen: document.getElementById("is_allergen").checked,
            };
            try {
                const response = await axios.post(
                    api.api_routes.ingredients,
                    add
                );
                M.toast({ html: response.data.msg, classes: "rounded" });
                document.getElementById("ingr_name").value =
                    add.ingredient_name;
            } catch (err) {
                M.toast({
                    html: "Creation failed. Maybe the ingredient already exists ?",
                    classes: "rounded",
                });
            }
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

.z-depth-1 {
    margin: 5px;
}

.ingredient.col.s2 {
    margin: 0px;
    padding: 0px;
}
.row {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 10px auto;
}

#addIngredient {
    max-width: 500px;
}

.col {
    margin: 5px auto;
    text-align: center;
}

#ingr_actions div {
    margin: auto;
}

#modal_addIngr {
    max-width: 300px;
}

select {
    width: fit-content;
}
</style>
