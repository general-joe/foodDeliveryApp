import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { restApi } from "../../../appSetup/hook";
import { Button } from "../../../components/forms";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { data } = restApi.useGetClientsQuery();

  const [updateClient, { isLoading: updateLoading }] =
    restApi.useUpdateClientMutation();
  const singleClient = data?.clients?.find((client) => client.id === id);

  const onSubmit = async (data) => {
    try {
      const updateClientData = {
        username: data.username,
        role: data.role,
        id,
      };
      const response = await updateClient(updateClientData);
      if (!response.error) {
        toast.success("Client updated successfully");
        navigate("/admin-dashboard/clients");
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
        Edit the Admin
        <Link
          to="/admin-dashboard/clients"
          className="pl-10 text-sm font-normal underline"
        >
          Go back
        </Link>
      </h1>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Edit username"
          className="border-b w-full border input-bordered rounded-md outline-none bg-transparent text-black my-3 py-4 px-2"
          defaultValue={singleClient?.username}
          {...register("username", { required: "Name is required" })}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <select
          className="border-b w-full border input-bordered rounded-md outline-none bg-transparent text-black my-3 py-4 px-2"
          defaultValue={singleClient?.role}
          {...register("role", { required: "Role is required" })}
        >
          <option value="Admin">Admin</option>
          <option value="Client">Client</option>
        </select>
        <Button title="Update" loading={updateLoading} />
      </form>
    </div>
  );
}

export default EditClient;
