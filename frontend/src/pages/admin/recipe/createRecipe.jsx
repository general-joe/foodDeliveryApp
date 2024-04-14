import React from "react";
import { Link } from "react-router-dom";
import { Form } from "../../../components/forms";
import { useNavigate } from "react-router-dom";
import { restApi } from "../../../appSetup/api";
import { toast } from "react-toastify";

function CreateRecipe() {
  const navigate = useNavigate();
  const [createRecipe, { isLoading }] = restApi.useCreateRecipeMutation();
  const onSubmit = async (data) => {
    const formData = new FormData();
    const image = formData.append("image", data.image[0]);

    const recipeData = {
      title: data.title,
      description: data.description,
      quantity: data.quantity,
      total: data.total,
      price: data.price,
      item: image,
    };
    const response = await createRecipe(recipeData);
    if (response.error) {
      toast(response.error);
      return;
    }
    toast.success("Successful!");
    navigate("/admin-dashboard/recipe");
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
    quantity: {
      label: "Quantity",
      placeholder: "Enter quantity",
      type: "number",
    },
    total: {
      label: "Total",
      placeholder: "Enter total",
      type: "number",
    },
    price: {
      label: "Recipe price",
      placeholder: "Enter price",
      type: "text",
    },
    item: {
      label: "Recipe Image",
      type: "file",
      validationMsg: "Please select an image",
    },
  };
  return (
    <div className="w-[60%] h-auto mx-auto my-10 p-3">
      <h1 className="text-4xl font-bold py-5">
        Create a recipe
        <Link to="/recipe" className="pl-10 underline font-normal text-sm">
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
