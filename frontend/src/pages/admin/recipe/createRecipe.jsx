import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../../components/forms";
import { restApi } from "../../../appSetup/hook";
import { toast } from "react-toastify";

function CreateRecipe() {
  const navigate = useNavigate();
  const [createRecipe, { isLoading }] = restApi.useCreateRecipeMutation();
  const { data } = restApi.useGetCategoriesQuery();

  const categoriesOptions = data?.cartegories?.map((category) => ({
    value: category.id,
    label: category.type,
  }));

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("quantity", 1);
      formData.append("total", 1);
      formData.append("price", data.price);
      formData.append("categoryId", data.category);
      const response = await createRecipe(formData);
      if (!response.error) {
        toast.success("Successful!");
        navigate("/admin-dashboard/recipe");
        return;
      }
    } catch (error) {
      toast.error("Could not create recipe");
    }
  };

  const recipe_data = {
    title: {
      label: "Recipe Title",
      placeholder: "Enter recipe title",
      type: "text",
    },
    description: {
      label: "Description",
      placeholder: "Enter recipe description",
      type: "text",
    },
    price: {
      label: "Recipe price",
      placeholder: "Enter price",
      type: "number",
    },
    image: {
      label: "Recipe Image",
      type: "file",
      validationMsg: "Please select an image",
    },
    category: {
      label: "Category",
      options: categoriesOptions || [],
      validationMsg: "Please select a category",
      type: "select",
    },
  };
  return (
    <div className="w-[60%] h-auto mx-auto my-10 p-3">
      <h1 className="py-5 text-4xl font-bold">
        Create a recipe
        <Link
          to="/admin-dashboard/recipe"
          className="pl-10 text-sm font-normal underline"
        >
          Go back
        </Link>
      </h1>
      {/* Form Wizard */}
      <Form
        data={recipe_data}
        onSubmit={onSubmit}
        title="Create"
        loading={isLoading}
      />
    </div>
  );
}

export default CreateRecipe;
