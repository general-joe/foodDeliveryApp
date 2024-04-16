import { restApi } from "../../../appSetup/hook";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Clients() {
  const { data, isLoading } = restApi.useGetClientsQuery();
  const [deleteClient] = restApi.useDeleteClientMutation();
  const navigate = useNavigate();

  const handleDelete = async (clientId) => {
    try {
      await deleteClient(clientId);
      toast.error("Client deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    }
  };
  return (
    <div className="">
      <div className="flex items-center justify-between px-4 py-5">
        <h1 className="text-2xl font-bold ">Clients</h1>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="text-lg">User Name</th>
              <th className="text-lg">Email</th>
              <th className="text-lg">Role</th>
              <th className="text-lg">Edit</th>
              <th className="text-lg">Delete</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {isLoading && <div className="loader"></div>}
            {data?.clients?.map((client) => (
              <tr key={client.id}>
                {/* User name */}
                <td>
                  <p>{client.username}</p>
                </td>
                {/* Email */}
                <td>
                  <p>{client.email}</p>
                </td>
                {/* Role */}
                <td>
                  <p>{client.role}</p>
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      navigate(
                        `/admin-dashboard/clients/edit-client/${client.id}`
                      );
                    }}
                  >
                    <MdModeEditOutline />
                  </button>
                </th>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleDelete(client.id)}
                  >
                    <MdDelete />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clients;
