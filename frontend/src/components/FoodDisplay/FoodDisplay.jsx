import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { restApi } from "../../appSetup/api";

const FoodDisplay = ({ category }) => {
  const { data, isLoading } = restApi.useGetRecipiesQuery();
  console.log(data);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {isLoading && <div className="loader"></div>}
        {data?.recipes.length > 0 ? (
          data?.recipes?.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
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
