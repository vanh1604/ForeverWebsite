import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAllOrders = async () => {
    try {
      if (!token) return;

      const res = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
      toast.error(error.message);
    }
  };

  const changeStatus = async (e, orderId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: e.target.value,
        },
        { headers: { token } }
      );

      if (res.data.success) {
        await fetchAllOrders();
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [token,orders]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.length > 0 ? (
          orders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gey-200 p-5 md:p-8 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              <img src={assets.parcel_icon} alt="Parcel" className="w-12" />
              <div>
                <div>
                  {order.items.map((item, itemIndex) => (
                    <p key={itemIndex} className="py-0.5">
                      {item.name} x {item.quantity} <span>{item.size}</span>
                    </p>
                  ))}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {order.address?.firstName + " " + order.address?.lastName ||
                    "No Name"}
                </p>
                <div>
                  {" "}
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zip}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">
                  Items : {order.items.length}
                </p>
                <p className="mt-3">Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">${order.amount}</p>
              <select
                onChange={(e) => changeStatus(e, order._id)}
                value={order.status}
                className="p-2 font-semibold"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out of delivery">Out of delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
