import "./ExploreMenu.css";

import { restApi } from "../../appSetup/hook";
const ExploreMenu = ({ category, setCategory }) => {
  const { data, isLoading } = restApi.useGetCategoriesQuery();
  console.log(data);
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.{" "}
      </p>

      <div className="explore-menu-list">
        {isLoading ? (
          <div className="loader"></div>
        ) : data?.cartegories.length > 0 ? (
          data?.cartegories?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setCategory((prev) =>
                    prev === item.type ? "All" : item.type
                  );
                }}
                key={index}
                className="explore-menu-list-item"
              >
                <img
                  className={category === item.type ? "active" : ""}
                  src={item.item}
                  alt=""
                />
                <p>{item.type}</p>
              </div>
            );
          })
        ) : (
          <div>
            <p>No categories found</p>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
