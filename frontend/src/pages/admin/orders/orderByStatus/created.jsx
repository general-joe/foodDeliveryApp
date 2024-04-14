import React, { useState } from "react";
import { restApi } from "../../../../appSetup/hook";
import Table from "../../../../components/table";
import { useNavigate } from "react-router-dom";

function CreatedOrder() {
  const navigate = useNavigate();
  const { data, isLoading } = restApi.useGetOrdersQuery();
  const createdOrders = data.orders?.filter(
    (order) => order.status === "CREATED" || []
  );
  const [selectedOrder, setSelectedOrder] = useState([]);

  const handleOrderSelect = (orderId) => {
    setSelectedOrder((prevSelectedOrders) => {
      if (prevSelectedOrders[orderId]) {
        const { [orderId]: _, ...rest } = prevSelectedOrders;
        return rest;
      } else {
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  const handleSubmit = () => {
    const status = "PROCESSED";
    // Navigate to /admin-dashboard/processed-orders
    console.log(selectedOrder);
  };

  return (
    <div className="">
      <div>
        <h1 className="p-5 text-3xl font-bold">Created Orders</h1>
        {/* React-Select */}
        <div className="">
          <button className="btn btn-ghost " onClick={() => handleSubmit()}>
            Process
          </button>
        </div>
      </div>
      {/* Order Table */}
      <div className="overflow-x-auto">
        <Table
          data={createdOrders}
          onSubmit={handleOrderSelect}
          selectedOrder={selectedOrder}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default CreatedOrder;
