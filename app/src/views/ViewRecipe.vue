<script setup>
import Ingredients from "../components/ViewIngredients.vue";
import Steps from "../components/ViewSteps.vue";
import Info from "../components/ViewInfo.vue";
defineProps({
    recipe_id: {
        type: String,
        required: false,
        default: "",
    },
});
</script>

<template>
    <div class="container">
        <div class="row">
            <Info :info="this.info"></Info>
        </div>
        <div class="row">
            <Ingredients
                class="ingredients"
                :ingredients="this.ingredients"
            ></Ingredients>
            <Steps :steps="this.steps"></Steps>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    created() {
        if (this.recipe_id.length == 0) {
            this.fetchRecipe(this.$route.params["uuid"]);
        } else {
            this.fetchRecipe(this.recipe_id);
        }
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                this.fetchRecipe(toParams["uuid"]);
            }
        );
    },
    data() {
        return {
            ingredients: [],
            info: {},
            steps: [],
        };
    },
    methods: {
        fetchRecipe(id) {
            axios
                .get("http://localhost:3080/api/recipes/" + id)
                .then((response) => {
                    const data = response.data;
                    this.info = {
                        diet: data.diet_name,
                        season: data.season_name,
                        type: data.type_name,
                        cost: data.recipe_cost,
                        difficulty: data.recipe_difficulty,
                        duration: data.recipe_duration,
                        for: data.recipe_for,
                        name: data.recipe_name,
                        author: data.username,
                    };
                    this.ingredients = data.ingredients;
                    this.steps = data.recipe_steps.split("\\n\\n");
                });
        },
    },
};
</script>

<style scoped>
.ingredients {
    position: sticky;
    top: 100px;
}

@media only screen and (max-width: 600px) {
    .ingredients {
        position: static;
    }
}
</style>
