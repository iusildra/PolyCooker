<script setup></script>

<template>
    <div class="container">
        <form id="signup" @submit.prevent="signup">
            <h3>
                {{ getters.getUser.admin ? "Create user" : "Sign up" }}
            </h3>
            <div v-if="getters.getUser.admin">
                <label>
                    <input type="checkbox" id="isAdmin" />
                    <span>Admin</span>
                </label>
            </div>
            <div class="input-field">
                <label for="signup">Email</label>
                <input type="text" id="email" required />
            </div>
            <div class="input-field">
                <label for="signup">Username</label>
                <input type="text" id="username" required />
            </div>
            <div class="input-field">
                <label for="signup">Password</label>
                <input type="password" id="passwd" required />
            </div>
            <div class="input-field">
                <label for="signup">Repeat password</label>
                <input type="password" id="passwd_repeat" required />
            </div>
            <div class="input-field">
                <button class="btn waves-effect waves-light" type="submit">
                    Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import AuthService from "../services/AuthServices";
import M from "materialize-css";
M.AutoInit();
export default {
    mounted() {
        if (this.getters.isLoggedIn && !this.getters.getUser.admin) {
            this.$router.push("/account");
            M.toast({
                html: "Your are already logged in !",
                classes: "rounded",
            });
        }
    },
    data() {
        return {
            getters: this.$store.getters,
        };
    },
    methods: {
        signup: async function () {
            const regex = /^\w+[\w-\\.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
            const email = document.querySelector("#email").value;
            if (regex[Symbol.search](email) == "-1") {
                M.toast({ html: "Invalid email !", classes: "rounded" });
                return;
            }
            try {
                const credentials = {};
                document.querySelectorAll("#signup input").forEach((elt) => {
                    if (elt.type == "checkbox") {
                        credentials[elt.id] = elt.checked;
                    } else {
                        credentials[elt.id] = elt.value;
                    }
                });
                const response = await AuthService.signup(credentials);
                M.toast({ html: response.msg, classes: "rounded" });
                this.$router.push("/signin");
            } catch (error) {
                M.toast({ html: error.response.data.msg, classes: "rounded" });
            }
        },
    },
};
</script>

<style scoped>
form {
    max-width: 500px;
    text-align: center;
    padding: 50px;
    margin: 50px auto;
    border: 1px solid black;
}
</style>
