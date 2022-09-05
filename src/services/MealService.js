import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getRandomMeal() {
    return apiClient.get("/random.php");
  },
};