import App from "./App.vue";
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import CreateRecipe from "./views/Create-recipe.vue";
import ViewRecipe from "./views/Recipe-view.vue";
import EditInfo from "./views/Edit-user-info.vue";
import Calendar from "./views/User-calendar.vue";
import Homepage from "./views/App-homepage.vue";
import Account from "./views/User-account.vue";
import Signin from "./views/Sign-in.vue";
import Signup from "./views/Sign-up.vue";
import Axios from "axios";
import store from "./store";

console.log(process.env.BASE_URL);
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

const vuerouter = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(vuerouter).use(store).mount("#app");
