import React from "react";
import { restApi } from "../../../appSetup/hook";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

function Clients() {
  const { data, isLoading } = restApi.useGetClientsQuery();
  console.log(data, "data");
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
                  <button className="btn btn-ghost btn-xs">
                    <MdModeEditOutline />
                  </button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">
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
