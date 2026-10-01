import { useState } from "react";
import { createOrder, processPayment, assignDeliveryPartner } from "./api/foodDelivery.js";

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const log = (message) => {
    console.log(message);
    setLogs((prev) => [...prev, message]);
  };

  async function placeOrder() {
    setLogs([]);
    setLoading(true);

    try {
      log("Creating order...");

      const orderPromise = createOrder();
      console.log("createOrder promise:", orderPromise);    //  createOrder promise pending
      const order = await orderPromise;
      log(`Order created: ${order.orderId}`);
      console.log("createOrder promise:", orderPromise);     //  createOrder promisefullfilled

      const paymentPromise = processPayment(order);
      console.log("processPayment promise:", paymentPromise);    //  processPayment promise pending
      const paidOrder = await paymentPromise;
      log("Payment successful.");
      console.log("processPayment promise:", paymentPromise);     //  processPayment promise fullfilled

      const deliveryPromise = assignDeliveryPartner(paidOrder);
      console.log("assignDeliveryPartner promise:", deliveryPromise);    //  assignDeliveryPartner promise pending
      const finalOrder = await deliveryPromise;
      log(`Delivery partner assigned: ${finalOrder.deliveryPartner}`);
      console.log("assignDeliveryPartner promise:", deliveryPromise);    //  assignDeliveryPartner promise fullfilled

      log("Order confirmed!");
      
      console.log(finalOrder);    //  final information of order
    } catch (error) {
      log(`Order failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Food Delivery</h1>
      <button onClick={placeOrder} disabled={loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>
      <ul>
        {logs.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;