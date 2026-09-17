const WHATSAPP_NUMBER = '919304944981';

export function buildOrderMessage(productName: string, quantity = 1, productUrl?: string) {
  const qtyPart = quantity > 1 ? ` x${quantity}` : '';
  const linkPart = productUrl ? `\n${productUrl}` : '';
  return `Hi! I'd love to order: ${productName}${qtyPart} ✦${linkPart}`;
}

export function openWhatsAppOrder(productName: string, quantity = 1, productSlug?: string) {
  const productUrl =
    productSlug && typeof window !== 'undefined'
      ? `${window.location.origin}/product/${productSlug}`
      : undefined;
  const message = buildOrderMessage(productName, quantity, productUrl);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
