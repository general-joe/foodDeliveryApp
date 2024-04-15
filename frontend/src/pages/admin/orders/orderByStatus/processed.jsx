import React, { useState } from "react";
import Table from "../../../../components/table";
import { restApi } from "../../../../appSetup/hook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProcessedOrders() {
  const navigate = useNavigate();
  const { data, isLoading } = restApi.useGetOrdersQuery();
  const [updateOrderStatus, { isLoading: updateLoading }] =
    restApi.useUpdateOrderStatusMutation();
  const processedOrders = data.orders?.filter(
    (order) => order.status === "PROCESSED"
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

  const handleSubmit = async () => {
    const status = "DELIVERED";
    const updateStatus = {
      status,
      ids: selectedOrder,
    };
    const response = await updateOrderStatus(updateStatus);
    if (!response.error) {
      toast.success("Order updated successfully");
      navigate("/admin-dashboard/delivered-orders");
    } else {
      toast.error("Status unable to update");
    }
    console.log(selectedOrder);
  };
  return (
    <div className="">
      <div>
        <h1 className="p-5 text-3xl font-bold">Processed Orders</h1>
        {/* Submit Button */}
        <div className="">
          <button
            className="btn btn-ghost bg-[#E96813] text-white rounded-md p-2 text-center"
            onClick={() => handleSubmit()}
          >
            {updateLoading && <div className="loader"></div>}
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
