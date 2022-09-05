<template>
    mon component
    {{meal}}
</template>

<script>
import { watchEffect } from "vue";
import MealService from "@/services/MealService.js";
export default {
    data() {
        return {
        meal: null
        };
  },
    created() {
        watchEffect(() => {
        this.meal = null;
        MealService.getRandomMeal()
        .then((response) => {
          this.meal = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
}
</script>