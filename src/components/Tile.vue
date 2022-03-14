<script setup>
defineProps({
    recipes: {
        //Array of objects {name:, img:, name:, season:, author:}
        type: Array,
        required: true,
    },
});
</script>
<template>
    <div class="card col s5 m5 l3 xl3 hoverable" v-for="recipe of this.recipes" :key="recipe.id">
        <div class="card-image">
            <img class="responsive-img" src="../assets/img/food.png" :alt="recipe.name + '\'s picture'"/>
        </div>
        <div class="card-content">
            <span class="card-title">{{capitalize(recipe.name)}}</span>
            <p class="center">{{recipe.author}}</p>
            <p>
                Difficulty : {{recipe.difficulty}}, Cost : {{recipe.cost}}
            </p>
            <p>Season : {{recipe.season}}</p>
        </div>
        <div class="card-action">
            <a href="#">Some action</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        capitalize(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
        chooseRecipe(id) {
            //Open recipe in new page
        },
    },
};
</script>

<style scoped>
img {
    max-width: 100%;
}

.card {
    max-width: 250px;
    margin: 10px 10px;
}

.card .card-title {
    font-size: large;
    text-decoration: underline;
}
</style>
