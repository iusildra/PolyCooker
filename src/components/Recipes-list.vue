<script setup>
import { defineProps } from 'vue';
import Tile from "./Recipe-tile.vue";
defineProps({
    recipes: {
        type: Array,
        required: false,
        default: () => [],
    },
    personalPage: {
        type: Boolean,
        required: false,
        default: false,
    },
    offset: {
        type:Number,
        required: true
    },
    limit: {
        type:Number,
        required: true
    }
});
</script>

<template>
    <div class="col s12 m9 l9 xl10" id="recipe_list">
        <ul class="pagination">
            <li class="waves-effect">
                <a :href="'#'+path+'?offset='+previousPage+'&limit=25'" :disabled="firstPage"><i class="material-icons">west</i></a>
            </li>
            <li class="waves-effect">
                <a :href="'#'+path+'?offset='+nextPage+'&limit=25'"><i class="material-icons">east</i></a>
            </li>
        </ul>
        <Tile
            :recipes="recipes"
            :personalPage="personalPage"
            @recipeChosen="recipeChosen"
            @removeRecipe="removeRecipe"
            @addCalendar="addCalendar"
        ></Tile>
    </div>
</template>

<script>
export default {
    methods: {
        recipeChosen(id) {
            this.$emit("recipeChosen", id);
        },
        removeRecipe(recipe) {
            this.$emit("removeRecipe", recipe);
        },
        addCalendar(id, name) {
            this.$emit("addCalendar", id, name);
        },
    },
    computed: {
        path() {
            return this.$route.path
        },
        nextPage() {
            return this.offset+this.limit
        },
        previousPage() {
            const res = this.offset-this.limit
            return res < 0 ? 0 : res
        },
        firstPage() {
            return this.offset == null || this.offset == 0
        }
    }
};
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
