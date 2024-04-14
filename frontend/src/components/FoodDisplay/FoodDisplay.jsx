import React from "react";
import "./FoodDisplay.css";

import FoodItem from "../FoodItem/FoodItem";
import { restApi } from "../../appSetup/hook";

const FoodDisplay = ({ category }) => {
  const { data } = restApi.useGetRecipiesQuery();

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {data?.recipes?.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.title}
                description={item.description}
                price={item.price}
                image={item.item}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
