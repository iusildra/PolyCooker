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
    <main>
        <div class="row">
            <Searchbar @searchRecipes="searchRecipes" :personalPage="false"></Searchbar>
            <List :userid="this.id" :recipes="this.recipes"></List>
        </div>
    </main>
</template>

<script>
M.AutoInit();
export default {
    mounted() {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push("/signup");
            M.toast({
                html: "You need to be logged in to access this page !",
                classes: "rounded",
            });
        } else {
            this.username = this.$store.getters.getUser.username;
            this.id = this.$store.getters.getUser.user_id;
            this.fetchRecipes(this.id);
        }
    },
    data() {
        return {
            username: "",
            id: "",
        };
    },
    methods: {
        searchRecipes: function (search) {
            this.$emit("searchRecipes", search, this.id);
        },
        fetchRecipes: function (id = "") {
            this.$emit("listReady", this.id)
        },
    },
};
</script>

<style></style>
