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

      const order = await createOrder();

      log(`Order created: ${order.orderId}`);

      const paidOrder = await processPayment(order);

      log("Payment successful.");

      const finalOrder = await assignDeliveryPartner(paidOrder);

      log(`Delivery partner assigned: ${finalOrder.deliveryPartner}`);

      log("Order confirmed!");
      console.log(finalOrder);
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
