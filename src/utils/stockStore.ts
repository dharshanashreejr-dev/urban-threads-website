import { products } from '../data/products';

const STOCK_KEY = 'urbanthreads_stock';

export type StockMap = Record<string, number>;

function seedStock(): StockMap {
  const map: StockMap = {};
  products.forEach((p) => {
    map[p.id] = p.stock;
  });
  return map;
}

export function getStockMap(): StockMap {
  try {
    const raw = localStorage.getItem(STOCK_KEY);
    if (!raw) {
      const seeded = seedStock();
      localStorage.setItem(STOCK_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as StockMap;
    // If new products were added to the catalogue since last seed, backfill them
    let changed = false;
    products.forEach((p) => {
      if (!(p.id in parsed)) {
        parsed[p.id] = p.stock;
        changed = true;
      }
    });
    if (changed) localStorage.setItem(STOCK_KEY, JSON.stringify(parsed));
    return parsed;
  } catch {
    return seedStock();
  }
}

export function getStock(productId: string): number {
  const map = getStockMap();
  return map[productId] ?? 0;
}

/** Deducts qty from a product's stock. Never goes below 0. */
export function deductStock(productId: string, qty: number) {
  const map = getStockMap();
  const current = map[productId] ?? 0;
  map[productId] = Math.max(0, current - qty);
  localStorage.setItem(STOCK_KEY, JSON.stringify(map));
}

/** Deducts stock for every item in an order in one go. */
export function deductStockForItems(items: { productId: string; qty: number }[]) {
  const map = getStockMap();
  items.forEach(({ productId, qty }) => {
    const current = map[productId] ?? 0;
    map[productId] = Math.max(0, current - qty);
  });
  localStorage.setItem(STOCK_KEY, JSON.stringify(map));
}

/** Admin action: manually refill/adjust stock for a product. */
export function setStock(productId: string, qty: number) {
  const map = getStockMap();
  map[productId] = Math.max(0, qty);
  localStorage.setItem(STOCK_KEY, JSON.stringify(map));
}

export function refillStock(productId: string, addQty: number) {
  const map = getStockMap();
  map[productId] = Math.max(0, (map[productId] ?? 0) + addQty);
  localStorage.setItem(STOCK_KEY, JSON.stringify(map));
}
