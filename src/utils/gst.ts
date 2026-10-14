export const GST_RATE = 0.05; // 5% GST applicable to apparel under Rs.1000/unit slab (adjust as per client's actual rate)

export function calculateGST(subtotal: number, rate: number = GST_RATE) {
  const gstAmount = Math.round(subtotal * rate * 100) / 100;
  const total = Math.round((subtotal + gstAmount) * 100) / 100;
  return { gstAmount, total };
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
}

// ---------------------------------------------------------------------------
// GST Reporting Helpers (Admin Dashboard - Weekly / Monthly breakdown)
// ---------------------------------------------------------------------------

export type GSTBucket = {
  key: string; // e.g. "2026-W36" or "2026-09"
  label: string; // human readable e.g. "01 Sep - 07 Sep" or "September 2026"
  orderCount: number;
  subtotal: number;
  gstAmount: number;
  total: number;
};

export type GSTPeriod = 'weekly' | 'monthly';

export interface GSTOrderLike {
  placedAt: string;
  subtotal: number;
  gstAmount: number;
  total: number;
  status: string;
}

function getISOWeekInfo(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  // Monday - Sunday range for label purposes
  const monday = new Date(date);
  const currentDay = monday.getDay() || 7;
  monday.setDate(monday.getDate() - currentDay + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const fmt = (dt: Date) =>
    dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

  return {
    key: `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`,
    label: `${fmt(monday)} - ${fmt(sunday)}`
  };
}

function getMonthInfo(date: Date) {
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const label = date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  return { key, label };
}

/**
 * Groups a list of orders into weekly or monthly GST buckets, sorted
 * most-recent period first. Cancelled orders are excluded from GST totals
 * since no GST liability applies to a cancelled sale.
 */
export function groupOrdersByGSTPeriod(
  orders: GSTOrderLike[],
  period: GSTPeriod
): GSTBucket[] {
  const buckets = new Map<string, GSTBucket>();

  orders
    .filter((o) => o.status !== 'Cancelled')
    .forEach((o) => {
      const date = new Date(o.placedAt);
      const { key, label } = period === 'weekly' ? getISOWeekInfo(date) : getMonthInfo(date);

      const existing = buckets.get(key);
      if (existing) {
        existing.orderCount += 1;
        existing.subtotal += o.subtotal;
        existing.gstAmount += o.gstAmount;
        existing.total += o.total;
      } else {
        buckets.set(key, {
          key,
          label,
          orderCount: 1,
          subtotal: o.subtotal,
          gstAmount: o.gstAmount,
          total: o.total
        });
      }
    });

  return Array.from(buckets.values()).sort((a, b) => (a.key < b.key ? 1 : -1));
}
