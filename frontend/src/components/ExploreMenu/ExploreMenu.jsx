import "./ExploreMenu.css";
import { restApi } from "../../appSetup/api";
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
      {isLoading && <div className="loader"></div>}
      <div className="explore-menu-list">
        {data?.cartegories.length > 0 ? (
          data?.cartegories?.map((item, index) => {
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
                <p>{item.menu_name}</p>
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
