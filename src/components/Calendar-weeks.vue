<script setup>
import { defineProps } from 'vue';
defineProps({
    nbWeeks: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <div v-for="i in nbWeeks" :key="i">
        <div class="divider"></div>
        <div class="row weekNb">
            <h4>Week n°{{ i }}</h4>
        </div>
        <div class="row col week">
            <div
                class="meals col z-depth-1 s12 m6 xl4"
                v-for="day of days"
                :key="day"
            >
                <h5>{{ day }}</h5>
                <h6>Noon</h6>
                <div class="row meal valign-wrapper">
                    <div
                        class="dropzone valign-wrapper center col s12 m5"
                        @drop="onDrop($event)"
                        @dragover.prevent
                        @dragenter.prevent
                    >
                        <span class="id" hidden></span>
                        <span class="name"></span>
                    </div>
                    <div class="input-field col s12 m6">
                        <label for=".nb_persons">For how many ?</label>
                        <input type="number" class="nb_persons" min="0" />
                    </div>
                </div>
                <h6>Evening</h6>
                <div class="row meal valign-wrapper">
                    <div
                        class="dropzone col s12 m5"
                        @drop="onDrop($event)"
                        @dragover.prevent
                        @dragenter.prevent
                    >
                        <span class="id" hidden></span>
                        <span class="name"></span>
                    </div>
                    <div class="input-field col s12 m6">
                        <label for=".nb_persons">For how many ?</label>
                        <input type="number" class="nb_persons" min="0" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            days: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
        };
    },
    methods: {
        onDrop(evt) {
            const itemID = evt.dataTransfer.getData("itemID");
            const itemName = evt.dataTransfer.getData("itemName");
            if (evt.target.tagName == "DIV") {
                evt.target.querySelector(".id").innerText = itemID;
                evt.target.querySelector(".name").innerText = itemName;
            } else {
                evt.target.innerText = itemName
                evt.target.parentNode.querySelector(".id").innerText = itemID
            }
        },
    },
    computed: {
        nbWeeks: function() {
            return parseInt(this.nbWeeks, 10)
        },
    }
};
</script>

<style scoped>
.input-field {
    width: 200px;
}
.row {
    text-align: center;
}

.food {
    padding: 0px 10px;
}
.dropzone > span {
    line-height: 16px;
}

.dropzone {
    margin: 5px auto;
    padding: 0px 20px;
    min-height: 40px;
    height: fit-content;
    min-width: 25%;
    width: fit-content;
    background-color: rgb(233, 233, 233);
    border-radius: 20px;
}

.divider {
    height: 2px;
}
</style>
