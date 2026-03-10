import menuData from "@/data/menu.json";

export interface OrderDetails {
  cart: any[];
  customOrder?: string;
  orderNotes?: string;
  orderType?: string;
  deliveryLocation?: string;
  scheduleTime?: string;
  customerName?: string;
  customerPhone?: string;
}

// Generate WhatsApp checkout URL with full order details
export function generateWhatsAppCheckout(order: OrderDetails) {
  const { cart, customOrder, orderNotes, orderType, deliveryLocation, scheduleTime, customerName, customerPhone } = order;

  if ((!cart || cart.length === 0) && !customOrder) return null;

  const business = menuData.business;

  let total = 0;
  let message = `Hello ${business.name} 👋\n\n`;

  if (customerName) message += `Name: ${customerName}\n`;
  if (customerPhone) message += `Phone: ${customerPhone}\n`;
  message += "\nI'd like to place an order:\n\n";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${item.quantity}x ${item.name} — KES ${itemTotal}\n`;
  });

  if (customOrder) {
    message += `\nCustom Order: ${customOrder}\n`;
  }

  if (orderNotes) {
    message += `Notes: ${orderNotes}\n`;
  }

  message += `\nSubtotal: KES ${total}\n`;

  if (orderType) message += `Order Type: ${orderType}\n`;
  if (deliveryLocation) message += `Delivery Location: ${deliveryLocation}\n`;
  if (scheduleTime) message += `Schedule: ${scheduleTime}\n`;

  message += `\nThank you!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.phone}?text=${encoded}`;
}

// Open WhatsApp in a new tab
export function openWhatsApp(order: OrderDetails) {
  const url = generateWhatsAppCheckout(order);
  if (url) window.open(url, "_blank");
}