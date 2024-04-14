import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../../components/forms";
import { restApi } from "../../../appSetup/hook";
import { toast } from "react-toastify";

function CreateRecipe() {
  const navigate = useNavigate();
  const [createRecipe, { isLoading }] = restApi.useCreateRecipeMutation();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("item", data.image[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("total", data.total);
    formData.append("price", data.price);

    const response = await createRecipe(formData);
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
