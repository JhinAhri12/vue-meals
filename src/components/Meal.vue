<template>
    <div v-if="meal" class="meal-infos">
        <h1>{{meal.strMeal}}</h1>
        <img :src="meal.strMealThumb" alt="meal-thumb">
        <ul >
            <li v-for="(ingredient) in ingredients" :key="ingredient.id" >{{ingredient}}</li>
        </ul>
        <p>{{meal.strInstructions}}</p>
    </div>

    <button @click="randomMeal">Afficher un plat aléatoire</button>
</template>

<script>
import { watchEffect } from "vue";
import MealService from "@/services/MealService.js";
export default {
    data() {
        return {
            meal: null,
            ingredients: null,
        };
  },
  methods: {
      randomMeal(){
          
            MealService.getRandomMeal()
            .then((response) => {
            this.meal = response.data.meals[0];
            console.log(this.meal);
            
        })
        .catch((error) => {
            console.log(error);
        });
      },
    },
    computed: {
        mealIngredient() {
            this.ingredients = [];
	// Get all ingredients from the object. Up to 20
            for(let i=1; i<=20; i++) {
                if(this.meal[`strIngredient${i}`]) {
                    this.ingredients.push(`${this.meal[`strIngredient${i}`]} - ${this.meal[`strMeasure${i}`]}`)
                } else {
                    // Stop if no more ingredients
                    break;
                }
            }
        }
    }
}
</script>