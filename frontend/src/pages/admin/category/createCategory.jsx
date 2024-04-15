import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../../components/forms";
import { restApi } from "../../../appSetup/hook";
import { toast } from "react-toastify";

function CreateCategory() {
  const navigate = useNavigate();

  const [createCategory, { isLoading }] = restApi.useCreateCategoryMutation();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("type", data.type);
    console.log(data);
    const response = await createCategory(formData);
    if (!response.error) {
      toast.success("Successful!");
      navigate("/admin-dashboard/category");
    }
    toast(response.error);
  };
  const category_data = {
    type: {
      label: "Category Type",
      placeholder: "Enter category type",
      type: "text",
    },
    image: {
      label: "Image",
      placeholder: "Upload picture",
      type: "file",
    },
  };

  return (
    <div className="w-[60%] h-auto mx-auto my-10 p-3">
      <h1 className="py-5 text-4xl font-bold">
        Create a Cartegory
        <Link
          to="/admin-dashboard/category"
          className="pl-10 text-sm font-normal underline"
        >
          Go back
        </Link>
      </h1>
      {/* Form wizard */}
      <Form
        data={category_data}
        onSubmit={onSubmit}
        loading={isLoading}
        title="Create"
      />
    </div>
  );
}

export default CreateCategory;
