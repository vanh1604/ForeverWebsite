import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { backendUrl } from "./../../../admin/src/App";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { orderId, success },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        toast.success("Order verified successfully");
        navigate("/orders");
      } else {
        toast.error("Order verification failed");
        navigate("/cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during verification");
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div></div>;
};

export default Verify;
