import React from "react";
import "./FoodDisplay.css";

import FoodItem from "../FoodItem/FoodItem";
import { restApi } from "../../appSetup/hook";

const FoodDisplay = ({ category }) => {
  const { data, isLoading } = restApi.useGetRecipiesQuery();
  const filterRecipes = () => {
    if (category === null) {
      return data?.recipes;
    } else {
      return data?.recipes.filter((recipe) => recipe.categoryId === category);
    }
  };

  const recipes = filterRecipes();
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {isLoading ? (
          <div className="loader"></div>
        ) : recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <FoodItem
              key={index}
              id={recipe.id}
              name={recipe.title}
              description={recipe.description}
              price={recipe.price}
              image={recipe.image}
            />
          ))
        ) : (
          <div className="no-data">
            <h3>No data available</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
