import React from "react";
import { IoFastFood } from "react-icons/io5";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { restApi } from "../../../appSetup/hook";

function Orders() {
  const { data, isLoading } = restApi.useGetOrderQuery();
  console.log(data, "data");
  return (
    <div className="">
      <div className="flex items-center justify-between px-4 py-5">
        <h1 className="text-2xl font-bold ">Orders</h1>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="text-lg">View Orders</th>
              <th className="text-lg">Quantity</th>
              <th className="text-lg">Sub Total</th>
              <th className="text-lg">Delivery Fee</th>
              <th className="text-lg">Edit</th>
              <th className="text-lg">Delete</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {isLoading && <div className="loader"></div>}
            {data?.orders?.map((order) => (
              <tr key={order.id}>
                {/* View Orders */}
                <td>
                  {/*Replace with /order-recipe/${id} */}
                  <Link to={`/order-recipe/${order.id}`}>
                    <IoFastFood className="w-8 h-8" />
                  </Link>
                </td>
                {/* Quantity */}
                <td>
                  <p>{order.quantity}</p>
                </td>
                {/* Total */}
                <td>
                  <p>{order.total}</p>
                </td>
                {/* Price */}
                <td>
                  <p>{order.price}</p>
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

export default Orders;
