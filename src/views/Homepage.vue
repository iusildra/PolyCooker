<script setup>
import Searchbar from "../components/Searchbar.vue";
import List from "../components/List.vue";
defineProps({
    recipes: {
        type: Array,
        required: true,
        default: [],
    },
});
</script>

<template>
    <div class="row">
        <Searchbar
            @searchRecipes="searchRecipes"
            :personalPage="true"
        ></Searchbar>
        <List
            :offset="this.offset"
            :limit="this.limit"
            :recipes="this.recipes"
            @recipeChosen="recipeChosen"
            @addCalendar="addCalendar"
        ></List>
    </div>
</template>

<script>
const defaultOffset = 0;
const defaultLimit = 25;
export default {
    mounted() {
        this.searchRecipes({});
        this.$watch(
            () => this.$route.query,
            (toParams, previousParams) => {
                this.offset = toParams.offset
                    ? parseInt(toParams.offset, 10)
                    : defaultOffset;
                this.limit = toParams.limit
                    ? parseInt(toParams.limit, 10)
                    : defaultLimit;
                this.$emit(
                    "searchRecipes",
                    this.search,
                    "",
                    this.offset,
                    this.limit
                );
            }
        );
    },
    data() {
        return {
            search: {},
            offset: defaultOffset,
            limit: defaultLimit,
        };
    },
    methods: {
        searchRecipes: function (search) {
            this.search = search;
            this.$emit("searchRecipes", search, "", this.offset, this.limit); //Empty id
        },
        recipeChosen(id) {
            this.$emit("recipeChosen", id);
        },
        addCalendar(id, name) {
            this.$emit("addCalendar", id, name);
        },
    },
};
</script>
