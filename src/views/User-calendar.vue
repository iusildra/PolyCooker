<script setup>
import Weeks from "../components/Calendar-weeks.vue";
import { defineProps } from 'vue';
defineProps({
    calendarRecipes: {
        type: Array,
        required: false,
        default: () => [],
    },
});
</script>

<template>
    <div id="calendar" class="container">
        <div class="row input-field">
            <select name="" id="nbWeek" v-model="nbWeeks">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <label for="nbWeek">Number of weeks</label>
        </div>
        <div class="col s12 m8">
            <Weeks :nbWeeks="parseInt(nbWeeks, 10)"></Weeks>
        </div>
        <div class="col s12 m4"></div>
        <div class="row list">
            <div
                class="chip"
                v-for="recipe of calendarRecipes"
                draggable="true"
                @dragstart="
                    startDrag($event, { id: recipe.id, name: recipe.name })
                "
                :key="recipe.id"
            >
                {{ recipe.name }}<i class="close material-icons">close</i>
            </div>
        </div>
        <div class="row">
            <button
                data-target="modal1"
                type="button"
                class="btn-large modal-trigger"
                @click="printShoppingList()"
            >
                Generate shopping list
            </button>
        </div>
        <!-- Modal Structure -->
        <div id="modal1" class="modal">
            <div ref="printcontent" class="modal-content">
                <h4>Shopping list</h4>
                <p v-for="i of Object.keys(shoppingList).sort()" :key="i">
                    <label>
                        <input type="checkbox" />
                        <span>{{
                            shoppingList[i].name +
                            " : " +
                            shoppingList[i].q +
                            shoppingList[i].unit
                        }}</span>
                    </label>
                </p>
            </div>
            <div class="modal-footer">
                <button class="btn-flat" @click="print">Print</button>
                <button class="modal-close waves-effect waves-green btn-flat">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../config/config.json"
import html2canvas from "html2canvas"
import M from "materialize-css"
import axios from "axios";
export default {
    created() {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push("/signin");
            M.toast({
                html: "You need to be logged in to access this page !",
                classes: "rounded",
            });
        } else {
            this.username = this.$store.getters.getUser.username;
            this.id = this.$store.getters.getUser.user_id;
        }
    },
    mounted() {
        M.AutoInit();
    },
    data() {
        return {
            nbWeeks: 1,
            shoppingList: {},
        };
    },
    methods: {
        startDrag(evt, item) {
            evt.dataTransfer.dropEffect = "move";
            evt.dataTransfer.effectAllowed = "move";
            evt.dataTransfer.setData("itemID", item.id);
            evt.dataTransfer.setData("itemName", item.name);
        },
        printShoppingList() {
            this.shoppingList = {};
            let crunchedMeals = {};
            const meals = document.querySelectorAll(".meal");
            meals.forEach((elt) => {
                const id = elt.querySelector(".id").innerText;
                const quantity = elt.querySelector(".nb_persons").value;
                if (id.length > 0) {
                    if (crunchedMeals[id] != null)
                        crunchedMeals[id] += parseInt(quantity, 10);
                    else crunchedMeals[id] = parseInt(quantity, 10);
                }
            });
            axios
                .get(api.api_routes.recipesIngredients, {
                    params: { meals: Object.keys(crunchedMeals) },
                })
                .then((response) =>
                    response.data.forEach((elt) => {
                        const ingr = elt.the_ingredient;
                        const recipe = elt.in_recipe;
                        let q = elt["Q per person"] * crunchedMeals[recipe];
                        let unit = elt.contained_unit;
                        if (unit == "d.s") {
                            q *= 10;
                            unit = "cl";
                        }
                        if (unit == "t.s") {
                            q *= 6;
                            unit = "cl";
                        }
                        if (this.shoppingList[ingr] == null) {
                            this.shoppingList[ingr] = {
                                name: ingr,
                                q: Math.round(parseInt(q)),
                                unit: unit,
                            };
                        } else {
                            this.shoppingList[ingr].q += Math.round(q);
                        }
                    })
                )
                .catch((err) => M.toast({ html: err.response.data.msg }));
        },
        async print() {
            console.log("printing..");
            const el = this.$refs.printcontent;

            const options = {
                type: "dataURL",
            };
            const printCanvas = await html2canvas(el, options);

            const link = document.createElement("a");
            link.setAttribute("download", "shoppingList.png");
            link.setAttribute(
                "href",
                printCanvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream")
            );
            link.click();

            console.log("done");
        },
    },
};
</script>

<style scoped>
.row {
    text-align: center;
}

.list {
    position: sticky;
    bottom: 100px;
}

.list span {
    border-radius: 20px;
    background-color: lightcyan;
    margin: 5px 10px;
    padding: 5px 10px;
}

.modal-footer {
    margin: auto;
}
.input-field {
    width: 100px;
}
</style>
