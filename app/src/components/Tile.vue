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
        class="card col s5 m5 l3 xl3 hoverable"
        v-for="recipe of this.recipes"
        :key="recipe['recipe_id']"
    >
        <div class="card-image">
            <img
                class="responsive-img"
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
            <div class="card-action">
                <a>
                    <p class="center">Add to my calendar</p>
                </a>
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
    max-width: 250px;
    margin: 10px 10px;
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
