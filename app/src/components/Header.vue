<script setup></script>

<template>
    <header>
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a @click="home" class="left brand-logo">Polycooker</a>
                    <ul class="right">
                        <li>
                            <a
                                class="dropdown-trigger"
                                href="#!"
                                data-target="dropdown1"
                                >Account<i class="material-icons right"
                                    >arrow_drop_down</i
                                ></a
                            >
                        </li>
                    </ul>
                </div>
            </nav>
            <ul id="dropdown1" class="dropdown-content">
                <li>
                    <router-link to="/account">My account</router-link>
                </li>
                <li>
                    <router-link to="/calendar">Calendar</router-link>
                </li>
                <li
                    class="divider"
                    v-if="!getters.isLoggedIn || getters.getUser.admin"
                ></li>
                <li v-if="!getters.isLoggedIn">
                    <router-link to="/signin">Sign in</router-link>
                </li>
                <li v-if="!getters.isLoggedIn">
                    <router-link to="/signup">Sign up</router-link>
                </li>
                <li v-if="getters.isLoggedIn && getters.getUser.admin">
                    <router-link to="/createuser">Create user</router-link>
                </li>
                <li class="divider" v-if="getters.isLoggedIn"></li>
                <li v-if="getters.isLoggedIn">
                    <router-link to="/" @click="logout"
                        >Deconnexion</router-link
                    >
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
M.AutoInit();
export default {
    data() {
        return { getters: this.$store.getters };
    },
    methods: {
        signIn: () => {
            let reqBody = {};
            document.querySelectorAll("#signup input").forEach((elt) => {
                reqBody[elt.id] = elt.value;
            });
            const option = {
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "POST",
            };

            fetch("http://localhost:3080/api/signin", option)
                .then((res) => res.json())
                .then((data) =>
                    M.toast({ html: data.msg, classes: "rounded" })
                );
        },
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/");
            M.toast({ html: "Goodbye !", classes: "rounded" });
        },
        home() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
nav {
    background-color: #019dde;
    padding-left: 10px;
}
</style>
