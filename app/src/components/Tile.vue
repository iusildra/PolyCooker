<script setup>
defineProps({
    recipes: {
        type: Array,
        required: true,
    },
});
</script>
<template>
    <div
        class="col s12 m6 l4 xl3"
        v-for="recipe of this.recipes"
        :key="recipe['recipe_id']"
    >
        <div class="card hoverable">
            <div class="card-image">
                <img
                    src="../assets/img/food.png"
                    :alt="recipe.name + '\'s picture'"
                />
            </div>
            <div class="card-content">
                <span class="card-title center">{{ recipe["recipe_name"] }}</span>
                <p class="center">{{ recipe["username"] }}</p>
                <p class="center">
                    Difficulty : {{ recipe["recipe_difficulty"] }} / 5
                </p>
                <p class="center">
                    Cost :
                    {{ recipe["recipe_cost"] }} / 5
                </p>
                <p class="center">Season : {{ recipe["season_name"] }}</p>
                <p class="center">Type : {{recipe["type_name"]}}</p>
                <p class="center">Diet : {{recipe["diet_name"]}}</p>
                <div class="card-action">
                    <a>
                        <p class="center">Add to my calendar</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        chooseRecipe(id) {
            //Open recipe in new page
        },
    },
};
</script>

<style scoped>
img {
    width: 100%;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
}

.card .card-title {
    font-size: large;
    text-decoration: underline;
}

.modal-trigger {
    color: black;
}
</style>
