<template>
    <div id="calendar" class="">
        <div class="row">
            <label for="nbWeek">Number of weeks</label>
            <select name="" id="nbWeek" class="browser-default" v-model="this.nbWeeks">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
        <div class="row week" v-for="i in parseInt(this.nbWeeks, 10)">
			<div class="weekNb col s12 m2">
				<h4>Week n°{{i}}</h4>
			</div>
            <div class="col hoverable s12 m8 l4 xl2" v-for="day of this.days" :key="day">
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
			nbWeeks: 1,
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

<style scoped>
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

select {
	margin: auto;
	width: fit-content;
	text-align: center;
}
.week > div {
	margin: 10px;
    display: flex;
	flex: 1 1 0;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
