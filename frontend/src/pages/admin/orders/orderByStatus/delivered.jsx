import { restApi } from "../../../../appSetup/hook";

function DeliveredOrder() {
  const { data, isLoading } = restApi.useGetOrdersQuery();
  const deliveredOrders = data.orders?.filter(
    (order) => order.status === "DELIVERED" || []
  );

  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th className="text-lg">Client Name</th>
          <th className="text-lg">Delivery Fee</th>
          <th className="text-lg">Amount</th>
          <th className="text-lg">Total</th>
          <th className="text-lg">Status</th>
        </tr>
      </thead>
      {/* Body */}
      <tbody>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          deliveredOrders?.map((order) => (
            <tr key={order.id} className="">
              {/* Name */}
              <td>{order?.client?.username}</td>
              {/* Delivery Fee */}
              <td>{order?.deliveryFee}</td>
              {/* Amount */}
              <td>{order?.subTotal}</td>
              {/*  Total */}
              <td>
                <p>{order.subTotal + order.deliveryFee}</p>
              </td>
              {/* Status */}
              <td>{order?.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default DeliveredOrder;
