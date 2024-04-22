import { restApi } from "../../appSetup/hook";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ExploreMenu = ({ category, setCategory }) => {
  const { data, isLoading } = restApi.useGetCategoriesQuery();
  return (
    <div className="flex flex-col gap-5" id="explore-menu">
      <h1 className="text-gray-800 font-semibold">Explore Our Menu</h1>
      <p className="max-w-3/5 text-gray-800">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.{" "}
      </p>

      <div className="flex justify-start items-center gap-7 text-center m-5 overflow-x-scroll">
        {isLoading ? (
          <div className="loader"></div>
        ) : data?.cartegories.length > 0 ? (
          data?.cartegories?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setCategory((prevCategory) =>
                    prevCategory === item.id ? null : item.id
                  );
                }}
                key={index}
                className="cursor-pointer"
              >
                <LazyLoadImage
                  className={`w-16 h-auto min-w-20 rounded-full transition-all duration-200 skeleton ${
                    category === item.id ? "border-4 border-[#ff6347] p-1" : ""
                  }`}
                  src={item.image}
                  alt=""
                />
                <p className="mt-2 text-gray-400 text-base cursor-pointer">
                  {item.type}
                </p>
              </div>
            );
          })
        ) : (
          <div>
            <p>No categories found</p>
          </div>
        )}
      </div>
      <hr className="my-2 h-0.5 bg-gray-300 border-none" />
    </div>
  );
};

export default ExploreMenu;
