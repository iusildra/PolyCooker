<script setup>
import Searchbar from "../components/Searchbar.vue";
import List from "../components/List.vue";
</script>

<template>
    <main>
        <div class="row">
            <Searchbar @searchRecipes="searchRecipes"></Searchbar>
            <List :userid="this.id"></List>
        </div>
    </main>
</template>

<script>
M.AutoInit();
export default {
    created() {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push("/signup");
            M.toast({
                html: "You need to be logged in to access this page !",
                classes: "rounded",
            });
        } else {
            this.username = this.$store.getters.getUser.username;
            this.id = this.$store.getters.getUser.user_id;
        }
    },
    data() {
        return {
            username: "",
            id: "",
            recipes: [],
        };
    },
    methods: {
        searchRecipes: (search) => {
            console.log("toto");
        },
    },
};
</script>

<style></style>
