<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Searchbar from "./components/Searchbar.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
</script>

<template>
    <Header></Header>
    <div class="display">
        <Searchbar :seasons="this.seasons"></Searchbar>
        <List></List>
    </div>
    <Footer></Footer>
</template>

<script>
export default {
    data() {
        return {
            seasons: [
                { id: 1, name: "Winter" },
                { id: 1, name: "Winter" },
                { id: 1, name: "Winter" },
                { id: 1, name: "Winter" },
            ],
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* color: #2c3e50; */
}
.display {
    display: flex;
    flex: 1 1 0;
    flex-wrap: wrap;
    margin-bottom: 25px;
}
</style>
