import type { CartItem } from '../context/CartContext';

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  cityDistrict?: string;
  pincode?: string;
  items: { name: string; size: string; qty: number; price: number; image?: string }[];
  subtotal: number;
  gstAmount: number;
  total: number;
  status: 'New' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  courierPartner?: string;
  placedAt: string;
  assignedStaffId?: 1 | 2;
  packagingStatus?: 'Pending' | 'Packed' | 'Handed to Courier';
};

const STORAGE_KEY = 'urbanthreads_orders';
const STAFF_COUNTER_KEY = 'urbanthreads_staff_assign_counter';

function nextStaffAssignment(): 1 | 2 {
  try {
    const raw = localStorage.getItem(STAFF_COUNTER_KEY);
    const count = raw ? parseInt(raw, 10) : 0;
    const next = count + 1;
    localStorage.setItem(STAFF_COUNTER_KEY, String(next));
    // Alternate evenly: odd-numbered orders -> staff1, even-numbered -> staff2
    return next % 2 === 1 ? 1 : 2;
  } catch {
    return 1;
  }
}

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with sample recent orders if empty so admin dashboard has immediate data
      const sampleOrders: Order[] = [
        {
          id: 'UTH-839201',
          customerName: 'Karthik Raman',
          customerPhone: '98421 73621',
          deliveryAddress: '42, Cross Cut Road, Gandhipuram',
          cityDistrict: 'Coimbatore',
          pincode: '641012',
          items: [
            { name: 'Pure Cotton Oxford Shirt', size: 'L', qty: 2, price: 699 },
            { name: 'Stretch Denim Jeans - Tapered', size: '32', qty: 1, price: 1199 }
          ],
          subtotal: 2597,
          gstAmount: 130,
          total: 2727,
          status: 'Dispatched',
          trackingNumber: 'ST-NMK-938210',
          courierPartner: 'ST Courier',
          assignedStaffId: 1,
          packagingStatus: 'Handed to Courier',
          placedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
        },
        {
          id: 'UTH-742918',
          customerName: 'Senthil Nathan',
          customerPhone: '94432 88192',
          deliveryAddress: '15, Anna Nagar 2nd Main Road',
          cityDistrict: 'Madurai',
          pincode: '625020',
          items: [
            { name: 'Textured Linen Blend Kurta', size: 'XL', qty: 1, price: 899 },
            { name: 'Cuban Collar Summer Shirt', size: 'XL', qty: 1, price: 649 }
          ],
          subtotal: 1548,
          gstAmount: 77,
          total: 1625,
          status: 'Confirmed',
          assignedStaffId: 2,
          packagingStatus: 'Pending',
          placedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
        },
        {
          id: 'UTH-651034',
          customerName: 'Venkatesh Kumar',
          customerPhone: '97901 44210',
          deliveryAddress: '88, Velur Road',
          cityDistrict: 'Mohanur',
          pincode: '637015',
          items: [
            { name: 'Heavyweight Cotton Polo', size: 'M', qty: 3, price: 549 }
          ],
          subtotal: 1647,
          gstAmount: 82,
          total: 1729,
          status: 'Delivered',
          trackingNumber: 'LOCAL-MHN-114',
          courierPartner: 'Direct Store Handover',
          assignedStaffId: 1,
          packagingStatus: 'Handed to Courier',
          placedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleOrders));
      return sampleOrders;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  const enriched: Order = {
    ...order,
    assignedStaffId: order.assignedStaffId ?? nextStaffAssignment(),
    packagingStatus: order.packagingStatus ?? 'Pending'
  };
  orders.unshift(enriched);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function updatePackagingStatus(id: string, packagingStatus: Order['packagingStatus']) {
  const orders = getOrders().map((o) => (o.id === id ? { ...o, packagingStatus } : o));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function updateOrderStatus(
  id: string,
  status: Order['status'],
  courierPartner?: string,
  trackingNumber?: string
) {
  const orders = getOrders().map((o) => {
    if (o.id === id) {
      return {
        ...o,
        status,
        courierPartner: courierPartner !== undefined ? courierPartner : o.courierPartner,
        trackingNumber: trackingNumber !== undefined ? trackingNumber : o.trackingNumber
      };
    }
    return o;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function buildOrderFromCart(
  orderId: string,
  customerName: string,
  customerPhone: string,
  deliveryAddress: string,
  cityDistrict: string,
  pincode: string,
  items: CartItem[],
  subtotal: number,
  gstAmount: number,
  total: number
): Order {
  return {
    id: orderId,
    customerName,
    customerPhone,
    deliveryAddress,
    cityDistrict,
    pincode,
    items: items.map((i) => ({
      name: i.product.name,
      size: i.size,
      qty: i.qty,
      price: i.product.price,
      image: i.product.image
    })),
    subtotal,
    gstAmount,
    total,
    status: 'New',
    placedAt: new Date().toISOString()
  };
}
