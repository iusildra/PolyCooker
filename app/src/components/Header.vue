<script setup></script>

<template>
    <header>
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <router-link to="/" class="left brand-logo"
                        >Polycooker</router-link
                    >
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
                <li v-if="getters.isLoggedIn">
                    <router-link to="/editinfo">Edit my info</router-link>
                </li>
                <li class="divider" v-if="getters.isLoggedIn"></li>
                <li v-if="getters.isLoggedIn">
                    <router-link to="/" @click="logout"
                        >Deconnexion</router-link
                    >
                </li>
                <li v-if="getters.isLoggedIn">
                    <router-link
                        to="/"
                        class="materialize-red-text"
                        @click="deleteAccount"
                        >Delete account</router-link
                    >
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
M.AutoInit();
import axios from "axios";
import api from "../config/config.json"
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

            fetch(api.api_routes.signin, option)
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
        deleteAccount: async function () {
            let confirm = prompt(
                "Please enter your full username (case sensitive) to confirm your account deletion"
            );
            if (confirm != this.$store.getters.getUser.username) return;
            const id = this.$store.getters.getUser.user_id;
            try {
                const response = await axios.delete(
                    api.api_routes.userById + id
                );
                this.logout();
                this.$emit("userDeleted", id);
                M.toast({
                    html: response.data.msg,
                    classes: "rounded",
                });
            } catch (err) {
                M.toast({ html: err.response.data.msg, classes: "rounded" });
            }
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
