<script setup></script>

<template>
    <div class="container">
        <form id="signin" class="input-field" @submit.prevent="signin">
            <h3>Sign in</h3>
            <div class="input-field">
                <label for="signup">Email/Usernme</label>
                <input type="text" id="emailusername" required />
            </div>
            <div class="input-field">
                <label for="signup">Password</label>
                <input type="password" id="passwd" required />
            </div>
            <div>
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
    created() {
        if (this.getters.isLoggedIn) {
            this.$router.push("/account")
            M.toast({html: "You are already logged in !", classes:"rounded"})
        }
    },
    data() {
        return {
            getters: this.$store.getters
        }
    },
    methods: {
        signin: async function () {
            try {
                const credentials = {};
                document.querySelectorAll("#signin input").forEach((elt) => {
                    credentials[elt.id] = elt.value;
                });
                const response = await AuthService.signin(credentials);
                const token = response.token;
                const user = response.user;

                this.$store.dispatch("login", { token, user });
                this.$router.push("/");
                M.toast({
                    html: `Welcome ${user.username} !`,
                    classes: "rounded",
                });
            } catch (error) {
                M.toast({
                    html: error.response.data.msg,
                    classes: "rounded",
                });
            }
        },
    },
    computed: {
        login: (token, user) => {
            this.$store.dispatch("login", { token, user });
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
