import React from "react";

function Table({ data, selectedOrder, onSubmit, loading }) {
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th className="text-lg">Client Name</th>
          <th className="text-lg">Delivery Fee</th>
          <th className="text-lg">Amount</th>
          <th className="text-lg">Total</th>
          <th className="text-lg">Status</th>
        </tr>
      </thead>
      {/* Body */}
      <tbody>
        {loading ? (
          <div className="loader"></div>
        ) : (
          data?.map((order) => (
            <tr
              key={order.id}
              className={
                selectedOrder[order.id] ? "bg-black bg-opacity-10" : ""
              }
            >
              {/* Input */}
              <th>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedOrder.includes(order.id)}
                    onChange={() => onSubmit(order.id)}
                    className="checkbox"
                  />
                </label>
              </th>
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

export default Table;
