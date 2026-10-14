export type CustomOrderRequest = {
  id: string;
  customerName: string;
  customerPhone: string;
  fabric: string;
  color: string;
  size: string;
  garmentType: string;
  notes: string;
  createdAt: string;
};

const STORAGE_KEY = 'urbanthreads_custom_orders';

export function getCustomOrders(): CustomOrderRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomOrder(request: CustomOrderRequest) {
  const all = getCustomOrders();
  all.unshift(request);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
