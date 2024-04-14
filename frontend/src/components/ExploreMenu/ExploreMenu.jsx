import React from "react";
import "./ExploreMenu.css";

import { restApi } from "../../appSetup/hook";
const ExploreMenu = ({ category, setCategory }) => {
  const { data, isLoading } = restApi.useGetCategoriesQuery();

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.{" "}
      </p>
      {isLoading && <div className="loader"></div>}
      <div className="explore-menu-list">
        {data?.cartegories?.map((item, index) => {
          return (
            <div
              onClick={() => {
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                );
              }}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item?.type}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
