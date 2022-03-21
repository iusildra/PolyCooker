<script setup>
defineProps({
    nbWeeks: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <div v-for="i in parseInt(this.nbWeeks, 10)">
        <div class="divider"></div>
        <div class="row weekNb col s12 m2">
            <h4>Week n°{{ i }}</h4>
        </div>
        <div class="row week">
            <div
                class="meals col hoverable s12 m8 l4 xl2"
                v-for="day of this.days"
                :key="day"
            >
                <h5>{{ day }}</h5>
                <div class="food">
                    <span>
                        <h6>Noon</h6>
                        <input type="text" placeholder="Recipe" />
                    </span>
                    <span>
                        <h6>Evening</h6>
                        <input type="text" placeholder="Recipe" />
                    </span>
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
};
</script>

<style>
.food {
    text-align: center;
    justify-content: space-around;
}

.food > span {
    padding: 10px;
}

.row {
    text-align: center;
}

.week {
    display: flex;
    overflow: auto;
}

select {
    margin: auto;
    width: fit-content;
    text-align: center;
}

.meals {
    max-width: 200px;
    margin: 10px;
    display: flex;
    flex: 1 1 0;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
}

.divider {
    height: 2px;
}
</style>
