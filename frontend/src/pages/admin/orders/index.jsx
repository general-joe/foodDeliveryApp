import React from "react";
import { IoFastFood } from "react-icons/io5";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { restApi } from "../../../appSetup/hook";

function Orders() {
  const { data, isLoading } = restApi.useGetOrdersQuery();

  const [deleteOrder] = restApi.useDeleteOrderMutation();
  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };
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
              <th className="text-lg">Delivery Fee</th>
              <th className="text-lg"> Amount</th>
              <th className="text-lg"> Total</th>
              <th className="text-lg">Status</th>
              <th className="text-lg">Edit</th>
              <th className="text-lg">Cancel</th>
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
                  <p>{order.deliveryFee}</p>
                </td>
                {/* Sub Total */}
                <td>
                  <p>{order.subTotal}</p>
                </td>
                {/*  Total */}
                <td>
                  <p>{order.subTotal + order.deliveryFee}</p>
                </td>
                {/* Price */}
                <td>
                  <p>{order.status}</p>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    <MdModeEditOutline />
                  </button>
                </th>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleDelete(order.id)}
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

export default Orders;
