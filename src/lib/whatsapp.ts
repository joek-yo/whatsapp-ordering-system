import menuData from "@/data/menu.json";

export function generateWhatsAppCheckout(cart: any[]) {
  if (!cart.length) return null;

  const business = menuData.business;

  let total = 0;

  let message = `Hello ${business.name} 👋\n\n`;
  message += `I'd like to place an order:\n\n`;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    message += `${item.quantity}x ${item.name} — KES ${itemTotal}\n`;
  });

  message += `\nTotal: KES ${total}\n\n`;
  message += `Pickup or Delivery please.\n`;
  message += `Thank you!`;

  const encoded = encodeURIComponent(message);

  return `https://wa.me/${business.phone}?text=${encoded}`;
}