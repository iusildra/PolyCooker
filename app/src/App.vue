<script setup>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script>
export default {};
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
