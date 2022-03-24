<script setup>
import Tile from "./Tile.vue";
defineProps({
    recipes: {
        type: Array,
        required: false,
        default: [],
    },
    personalPage: {
        type: Boolean,
        required: false,
        default: false,
    }
});
</script>

<template>
    <div class="col s12 m9 l9 xl10" id="recipe_list">
        <ul class="pagination">
            <li class="disabled">
                <a href="#!"><i class="material-icons">chevron_left</i></a>
            </li>
            <li class="active"><a href="#!">1</a></li>
            <li class="waves-effect"><a href="#!">2</a></li>
            <li class="waves-effect"><a href="#!">3</a></li>
            <li class="waves-effect"><a href="#!">4</a></li>
            <li class="waves-effect"><a href="#!">5</a></li>
            <li class="waves-effect">
                <a href="#!"><i class="material-icons">chevron_right</i></a>
            </li>
        </ul>
        <Tile :recipes="this.recipes" :personalPage="personalPage" @recipeChosen="this.recipeChosen"></Tile>
    </div>
</template>

<script>
export default {
    methods: {
        recipeChosen(id) {
            this.$emit("recipeChosen", id);
        },
    }
}
</script>

<style scoped>
#recipe_list {
    display: flex;
    flex: 1 1 0;
    flex-wrap: wrap;
}

ul {
    width: 100%;
    text-align: center;
}

li.active {
    background-color: #019dde;
}
</style>
