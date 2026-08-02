import { api } from './axios';

export const formatAddress = (addr: any): string => {
  if (!addr) return 'No Address added';
  const house = addr.house_no || addr.houseNo || '';
  const area = addr.area || '';
  const town = addr.town || '';
  const pin = addr.pincod || addr.pincode || '';
  const line = [house && area ? `${house}/${area}` : house || area, town]
    .filter(Boolean)
    .join(' ');
  return `${line}${pin ? `, ${pin}` : ''}, India`.trim() || 'No Address added';
};

/** Backend /orders/products omits category & about — fill from product API. */
export const enrichOrderProducts = async (items: any[] = []) => {
  return Promise.all(
    items.map(async (item) => {
      if (item?.category && item?.about) return item;
      try {
        const { data } = await api.get(`/products/${item.id}`);
        return {
          ...item,
          category: data.category ?? item.category ?? '',
          about: data.about ?? item.about ?? '',
          rating: data.rating ?? item.rating,
          brand: data.brand ?? item.brand,
          avatar: item.avatar || data.avatar,
          price: item.price ?? data.price,
        };
      } catch {
        return {
          ...item,
          category: item.category ?? '',
          about: item.about ?? '',
        };
      }
    }),
  );
};

/** Attach shipping address text using order.addressId → /address */
export const attachOrderAddresses = async (orderProducts: any[] = []) => {
  try {
    const [ordersRes, addressRes] = await Promise.all([
      api.get(`/orders`).catch(() => ({ data: [] })),
      api.get(`/address`).catch(() => ({ data: [] })),
    ]);
    const orders = ordersRes.data || [];
    const addresses = addressRes.data || [];

    return orderProducts.map((item) => {
      const order = orders.find((o: any) => o.id === item.orderId);
      const addr =
        addresses.find((a: any) => a.id === order?.addressId) ||
        addresses[addresses.length - 1];
      return {
        ...item,
        shippingAddress: formatAddress(addr),
        addressId: order?.addressId,
      };
    });
  } catch {
    return orderProducts.map((item) => ({
      ...item,
      shippingAddress: item.shippingAddress || 'No Address added',
    }));
  }
};
