import React from "react";
import { useParams } from "react-router-dom";
import { restApi } from "../../../appSetup/hook";

function OrderDetails() {
  const { id } = useParams();
  const { data, isLoading } = restApi.useGetOrderQuery(id);

  const orderDetails = data?.order?.orderDetails;
  const deliveryDetails = data?.order?.delivery;
  const clientDetails = data?.order?.client;
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold p-3">Here are your details</h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="w-auto shadow-md mx-auto h-auto grid grid-cols-3 mt-10 border-2">
          {/* Order details  */}
          <div className="flex flex-col  w-full p-5 border-r-2 border-r-gray-500">
            <h1 className="text-2xl py-2 font-bold">Order Details</h1>
            {orderDetails?.map((order) => (
              <ul key={order.id}>
                <li className="text-lg my-2">Title:{order.recipe.title}</li>
                <li className="text-lg my-2">
                  Description: {order.recipe.description}
                </li>
                <li className="text-lg my-2">Price: Gh{order.recipe.price}</li>
                <li className="text-lg my-2">Total: {order.recipe.total}</li>
              </ul>
            ))}
          </div>
          {/* Client */}
          <div className="w-full p-5 border-r-2 border-r-gray-500">
            <h1 className="text-2xl font-bold py-2">Client Information</h1>
            <div>
              <ul>
                <li className="text-lg my-2">
                  Username: {clientDetails?.username}
                </li>
                <li className="text-lg my-2">Email: {clientDetails?.email}</li>
              </ul>
            </div>
          </div>

          {/* Delivery */}
          <ul className="flex flex-col w-full p-5">
            <h1 className="text-2xl py-2 font-bold">Delivery Information</h1>
            <li className="text-lg my-2">
              Firstname: {deliveryDetails?.firstname}
            </li>
            <li className="text-lg my-2">
              Lastname: {deliveryDetails?.lastname}
            </li>
            <li className="text-lg my-2">Email: {deliveryDetails?.email}</li>
            <li className="text-lg my-2">
              Phone Number: {deliveryDetails?.phonenumber}
            </li>
            <li className="text-lg my-2">
              Country: {deliveryDetails?.country}
            </li>
            <li className="text-lg my-2">City: {deliveryDetails?.city}</li>
            <li className="text-lg my-2">State: {deliveryDetails?.state}</li>
            <li className="text-lg my-2">
              Street Name: {deliveryDetails?.street_name}
            </li>
            <li className="text-lg my-2">
              Zip Code: {deliveryDetails?.zipcode}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
