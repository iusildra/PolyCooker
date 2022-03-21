import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Calendar from "./views/Calendar.vue";
import Homepage from "./views/Homepage.vue";
import Account from "./views/Account.vue";
import Signin from "./views/Signin.vue";
import Signup from "./views/Signup.vue";
import Axios from "axios";
import store from "./store";

Axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;
const routes = [
    { path: "/", component: Homepage },
    { path: "/signin", component: Signin },
    { path: "/signup", component: Signup },
    { path: "/account", component: Account },
    { path: "/calendar", component: Calendar },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
createApp(App)
    .use(router)
    .use(store)
    .mount("#app");

M.AutoInit();

document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems, {});
});
