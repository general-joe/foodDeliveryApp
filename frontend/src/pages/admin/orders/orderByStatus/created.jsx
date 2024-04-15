import React, { useState } from "react";
import { restApi } from "../../../../appSetup/hook";
import Table from "../../../../components/table";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatedOrder() {
  const navigate = useNavigate();
  const { data, isLoading } = restApi.useGetOrdersQuery();
  const [updateOrderStatus, { isLoading: updateLoading }] =
    restApi.useUpdateOrderStatusMutation();

  const createdOrders = data.orders?.filter(
    (order) => order.status === "CREATED"
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
    const status = "PROCESSED";
    const updateStatus = {
      status,
      ids: selectedOrder,
    };
    const response = await updateOrderStatus(updateStatus);
    if (!response.error) {
      toast.success("Order updated successfully");
      navigate("/admin-dashboard/processed-orders");
    } else {
      toast.error("Status unable to update");
    }
  };
  console.log(createdOrders);

  return (
    <div className="">
      <div>
        <h1 className="p-5 text-3xl font-bold">Created Orders</h1>
        {/* React-Select */}
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
