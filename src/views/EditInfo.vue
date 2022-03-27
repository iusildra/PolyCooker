<script setup>
defineProps({});
</script>

<template>
    <div class="container">
        <form id="signup" @submit.prevent="updateData">
            <h3>Edit infos</h3>
            <div class="input-field">
                <input
                    type="text"
                    id="email"
                    :value="getters.getUser.email"
                    required
                />
                <label for="signup">Email</label>
            </div>
            <div class="input-field">
                <input
                    type="text"
                    id="username"
                    :value="getters.getUser.username"
                    required
                />
                <label for="signup">Username</label>
            </div>
            <div class="input-field">
                <label for="signup">New password</label>
                <input type="password" id="passwd" />
            </div>
            <div class="input-field">
                <label for="signup">Confirm password</label>
                <input type="password" id="passwd_repeat" />
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
import M from "materialize-css"
M.AutoInit();
export default {
    data() {
        return {
            getters: this.$store.getters,
        };
    },
    methods: {
        updateData: async function () {
            try {
                const credentials = {};
                document.querySelectorAll("#signup input").forEach((elt) => {
                    credentials[elt.id] = elt.value;
                });
                credentials["id"] = this.$store.getters.getUser.user_id;
                const response = await AuthService.updateData(credentials);
                M.toast({ html: response.msg, classes: "rounded" });
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
