<script setup>
defineProps({
    ingredients: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="col s12 m3 xl2">
		<h5>Ingredients</h5>
        <div
            class="s4 m6 l12"
            v-for="ingredient of ingredients"
            :key="ingredient.ingredient_id"
        >
            <div class="card">
                <span
                    ><strong
                        >{{ ingredient.quantity
                        }}{{ ingredient.unit_name + " " }}
                    </strong>
                </span>
                <span>{{ ingredient.ingredient_name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.col {
    position: sticky;
    border: 1px solid gray;
}
</style>
