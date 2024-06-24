import { Link, useNavigate, useParams } from "react-router-dom";
import { restApi } from "../../../appSetup/hook";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../components/forms";
import { useState } from "react";

function EditRecipe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { data } = restApi.useGetRecipiesQuery();
  const [updateRecipe, { isLoading }] = restApi.useUpdateRecipeMutation();
  const singleRecipe = data?.recipes?.filter((recipe) => recipe.id === id);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const price = parseFloat(data.price);
      formData.append("image", data.image[0]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", price);

      const response = await updateRecipe({ id, formData });
      if (!response.error) {
        toast.success("Recipe updated successfully");
        navigate("/admin-dashboard/recipe");
        return;
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="w-[60%] h-auto mx-auto my-10 p-3">
      <h1 className="py-5 text-4xl font-bold">
        Edit Recipe
        <Link
          to="/admin-dashboard/recipe"
          className="pl-10 text-sm font-normal underline"
        >
          Go back
        </Link>
      </h1>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-1">
          <label htmlFor="image">Image</label>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected recipe image"
              className="w-32 h-32 object-cover rounded-md my-3"
            />
          ) : (
            singleRecipe[0]?.image && (
              <img
                src={singleRecipe[0]?.image}
                alt="Current recipe image"
                className="w-32 h-32 object-cover rounded-md my-3"
              />
            )
          )}
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
          />
        </div>
        <div className="my-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Edit title"
            className="border-b w-full border input-bordered rounded-md outline-none bg-transparent text-black my-3 py-4 px-2"
            defaultValue={singleRecipe[0]?.title}
            {...register("title", { required: "Name is required" })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="my-1">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Edit description"
            className="border-b w-full border input-bordered rounded-md outline-none bg-transparent text-black my-3 py-4 px-2"
            defaultValue={singleRecipe[0]?.description}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="my-1">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="Edit price"
            className="border-b w-full border input-bordered rounded-md outline-none bg-transparent text-black my-3 py-4 px-2"
            defaultValue={singleRecipe[0]?.price}
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <Button title="Update" loading={isLoading} />
      </form>
    </div>
  );
}

export default EditRecipe;
