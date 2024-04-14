import { Link } from "react-router-dom";
import { Form } from "../../../components/forms";
import { restApi } from "../../../appSetup/hook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateCategory() {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = restApi.useCreateCategoryMutation();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("item", data.image[0]);
    formData.append("type", data.type);
    const response = await createCategory(formData);
    if (response.error) {
      toast(response.error);
      return;
    }
    toast.success("Successful!");
    navigate("/admin-dashboard/category");
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
        <Link to="/category" className="pl-10 text-sm font-normal underline">
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
