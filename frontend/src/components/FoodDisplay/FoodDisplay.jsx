import React from "react";
import "./FoodDisplay.css";

import FoodItem from "../FoodItem/FoodItem";
import { restApi } from "../../appSetup/hook";

const FoodDisplay = ({ category }) => {
  const { data, isLoading } = restApi.useGetRecipiesQuery();
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {isLoading ? (
          <div className="loader"></div>
        ) : data?.recipes.length > 0 ? (
          data?.recipes?.map((recipe, index) => {
            if (category === "All" || category === recipe.category) {
              return (
                <FoodItem
                  key={index}
                  id={recipe.id}
                  name={recipe.title}
                  description={recipe.description}
                  price={recipe.price}
                  image={recipe.item}
                />
              );
            }
          })
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
