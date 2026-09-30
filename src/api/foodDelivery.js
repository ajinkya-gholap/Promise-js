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
const deliveryPartners = ["Rahul", "Amit", "Om", "Shyam", "Vikram"];

export async function assignDeliveryPartner(order) {
  await delay(1000);

  const randomIndex = Math.floor(Math.random() * deliveryPartners.length);

  return {
    ...order,
    deliveryPartner: deliveryPartners[randomIndex],
  };
}
