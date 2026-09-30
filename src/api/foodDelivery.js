// Simulate API delay
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Create order
export async function createOrder() {
  await delay(1000);

  return {
    orderId: "ORD-1001",
    restaurant: "Pizza Palace",
    amount: 499,
  };
}

// Process payment
export async function processPayment(order) {
  await delay(1500);

  const paymentSuccess = Math.random() > 0.1;

  if (!paymentSuccess) {
    throw new Error("Payment failed");
  }

  return {
    ...order,
    paymentStatus: "Paid",
  };
}

// Find delivery partner
export async function assignDeliveryPartner(order) {
  await delay(1000);

  return {
    ...order,
    deliveryPartner: "Rahul",
  };
}
