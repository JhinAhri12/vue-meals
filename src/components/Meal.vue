<template>
    <div class="container">
         <button class="btn btn-flat" @click="randomMeal" >Afficher un plat aléatoire</button>

        <div class="meal-infos" v-if="meal">
            <h1>{{meal.strMeal}}</h1>
            <img :src="meal.strMealThumb" alt="meal-thumb">
            <ul>
                <li v-for="(ingredient) in ingredients" :key="ingredient.id" >{{ingredient}}</li>
            </ul>
            <p>{{meal.strInstructions}}</p>
        </div>
    </div>
    
</template>



<script>
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
            this.mealIngredient();
            
        })
        .catch((error) => {
            console.log(error);
        });
      },
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
    },
}
</script>

<style scoped>
.btn-flat {
  color: white;
  padding: 8px 24px;
  border-radius: 4px;
  background: #670BFF;
  transition: background 0.3s ease;
}

.btn-flat:hover {
  background: #4D04C4;
  color: white;
}

.flex-container {
  display: flex;
  justify-content: center;
}

.container {
  font-family: arial;
  font-size: 16px;
  margin: 2px;
}

div {
  text-align: center;
}

</style>