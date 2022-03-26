import App from "./App.vue";
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import CreateRecipe from "./views/CreateRecipe.vue";
import ViewRecipe from "./views/ViewRecipe.vue";
import EditInfo from "./views/EditInfo.vue"
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
    { path: "/editinfo", component: EditInfo },
    { path: "/createuser", component: Signup },
    { path: "/createrecipe", component: CreateRecipe },
    { path: "/recipe/:uuid", component: ViewRecipe },
    // { path: "/:*", component: Homepage }
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
