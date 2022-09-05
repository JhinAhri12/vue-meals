<template>
    <div class="container">
        <div>
            <span v-if="another"><button class="btn btn-flat" @click="randomMeal" >Afficher un autre plat aléatoire</button></span>
            <span v-else><button class="btn btn-flat" @click="randomMeal" >Afficher un plat aléatoire</button></span>
        </div>
         

        <div class="meal-infos" v-if="meal">
            <h1>{{meal.strMeal}}</h1>
            <h2>Ingredients :</h2>
            <img :src="meal.strMealThumb" alt="meal-thumb">
            <ul>
                <li v-for="(ingredient) in ingredients" :key="ingredient.id" >{{ingredient}}</li>
            </ul>
            <h2>Instuctions :</h2>
            <p><i>{{meal.strInstructions}}</i></p>
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
            another: null
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
            this.another = 'yes';
        }
    },
}
</script>

<style scoped>
.btn-flat {
margin-top:10px;
  color: white;
  padding: 8px 24px;
  border-radius: 4px;
  background: #670BFF;
  transition: background 0.3s ease;
}

h1, h2{
    color : #670bff;
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
  margin: 25px;
  
}

div {
  text-align: center;
}

p{
    padding-bottom:10px
}
</style>