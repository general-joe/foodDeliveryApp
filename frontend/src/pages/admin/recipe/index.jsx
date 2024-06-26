import { FaPlus } from "react-icons/fa";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { restApi } from "../../../appSetup/hook";
import { toast } from "react-toastify";

function Recipe() {
  const navigate = useNavigate();
  const { data, isLoading } = restApi.useGetRecipiesQuery();
  const [deleteRecipe] = restApi.useDeleteRecipeMutation();
  const handleDelete = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);
      toast.error("Recipe deleted successfully");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between px-4 py-5">
        <h1 className="text-2xl font-bold ">Recipes</h1>
        <p className="flex items-center gap-2 hover:underline hover:cursor-pointer">
          Create recipe
          <Link to="/admin-dashboard/add-recipe">
            <FaPlus />
          </Link>
        </p>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="text-lg">Image</th>
              <th className="text-lg">Title</th>
              <th className="text-lg">Description</th>
              <th className="text-lg">Price(Ghc)</th>
              <th className="text-lg">Edit</th>
              <th className="text-lg">Delete</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              data?.recipes?.map((recipe) => (
                <tr key={recipe.id}>
                  {/* Image */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle bg-slate-200">
                          <img src={recipe.image} alt="category-icon" />
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Title */}
                  <td>
                    <p>{recipe.title}</p>
                  </td>
                  {/* Description */}
                  <td>
                    <p>{recipe.description}</p>
                  </td>
                  {/* Price */}
                  <td>
                    <p>{recipe.price}</p>
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() =>
                        navigate(`/admin-dashboard/edit-recipe/${recipe.id}`)
                      }
                    >
                      <MdModeEditOutline />
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      <MdDelete />
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Recipe;
