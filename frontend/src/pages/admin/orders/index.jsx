import { IoFastFood } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
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
        <h1 className="text-3xl font-bold">All Orders</h1>
        <ul className="menu bg-base-200 w-56 rounded-box">
          <li>
            <details open>
              <summary>Order Status</summary>
              <ul>
                <li>
                  <Link to="/admin-dashboard/created-orders">
                    Created
                    <span className="badge rounded-full bg-green-500"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin-dashboard/processed-orders">
                    Processed
                    <span className="badge rounded-full bg-yellow-500"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin-dashboard/delivered-orders">
                    Delivered
                    <span className="badge rounded-full bg-orange-500"></span>
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="text-lg">Client Name</th>
              <th className="text-lg">Delivery Fee</th>
              <th className="text-lg"> Amount</th>
              <th className="text-lg"> Total</th>
              <th className="text-lg">Status</th>
              <th className="text-lg">View Orders</th>
              <th className="text-lg">Cancel</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {isLoading && <div className="loader"></div>}
            {data?.orders?.map((order) => (
              <tr key={order.id}>
                {/* Client Name */}
                <td>
                  <p>{order?.client?.username}</p>
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
                {/* View Orders */}
                <td>
                  <Link to={`/admin-dashboard/order-details/${order.id}`}>
                    <IoFastFood className="w-8 h-8" />
                  </Link>
                </td>
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
