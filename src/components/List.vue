<script setup>
import Tile from "./Tile.vue";
defineProps({});
</script>

<template>
    <div class="col s12 m9 l10 xl10" id="recipe_list">
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
        <Tile :recipes="this.recipes"></Tile>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recipes: [
                {
                    id: 1,
                    name: "Carottes miel épices",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 2,
                    name: "Carottes orange badiane",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 1,
                    name: "Carottes miel épices",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 2,
                    name: "Carottes orange badiane",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 1,
                    name: "Carottes miel épices",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 2,
                    name: "Carottes orange badiane",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 1,
                    name: "Carottes miel épices",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 1,
                    name: "Carottes miel épices",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 2,
                    name: "Carottes orange badiane",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 1,
                    name: "Carottes miel épices",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 2,
                    name: "Carottes orange badiane",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 1,
                    name: "Carottes miel épices",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 2,
                    name: "Carottes orange badiane",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 1,
                    name: "Carottes miel épices",
                    img: "",
                    season: "Winter",
                },
                {
                    id: 2,
                    name: "Carottes orange badiane",
                    img: "",
                    season: "Winter",
                },
            ],
        };
    },
};
</script>

<style scoped>
#recipe_list {
    display: flex;
    flex: 1 1 0;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

ul {
    width: 100%;
    text-align: center;
}

li.active {
    background-color: #019dde;
}

</style>
