import React, { useState } from "react";
import Table from "../../../../components/table";
import { restApi } from "../../../../appSetup/hook";
import { useNavigate } from "react-router-dom";

function ProcessedOrders() {
  const navigate = useNavigate();
  const { data, isLoading } = restApi.useGetOrdersQuery();
  const processedOrders = data.orders?.filter(
    (order) => order.status === "PROCESSED" || []
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
    const status = "DELIVERED";
    const updateStatus = {
      status,
      ids: selectedOrder,
    };
    // Navigate to /admin-dashboard/delivered-orders

    console.log(selectedOrder);
  };
  return (
    <div className="">
      <div>
        <h1 className="p-5 text-3xl font-bold">Processed Orders</h1>
        {/* React-Select */}
        <div className="">
          <button className="btn btn-ghost" onClick={() => handleSubmit()}>
            Process
          </button>
        </div>
      </div>
      {/* Order Table */}
      <div className="overflow-x-auto">
        <Table
          data={processedOrders}
          onSubmit={handleOrderSelect}
          selectedOrder={selectedOrder}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default ProcessedOrders;
