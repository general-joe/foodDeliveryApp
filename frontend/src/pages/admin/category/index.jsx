import React from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { restApi } from "../../../appSetup/hook";
import { toast } from "react-toastify";

function Category() {
  const navigate = useNavigate();
  const { data, isLoading } = restApi.useGetCategoriesQuery();
  const [deleteCategory] = restApi.useDeleteCategoryMutation();

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      toast.error("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between py-5 px-4">
        <h1 className="text-2xl font-bold ">Categories</h1>
        <p className="flex items-center gap-2 hover:underline hover:cursor-pointer">
          Create Category
          <Link to="/admin-dashboard/add-category">
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
              <th className="text-lg">Type</th>
              <th className="text-lg">Edit</th>
              <th className="text-lg">Delete</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              data?.cartegories?.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle bg-slate-200 w-12 h-12">
                          <img src={category.image} alt="category-icon" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{category.type}</p>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      <MdModeEditOutline />
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDelete(category.id)}
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

export default Category;
