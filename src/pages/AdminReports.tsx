import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  LogOut,
  ShoppingBag,
  Store,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Receipt,
  RefreshCw,
  Trophy,
  MapPin,
  Download
} from 'lucide-react';
import { getOrders, Order } from '../utils/ordersStore';
import { formatINR, groupOrdersByGSTPeriod, GSTPeriod } from '../utils/gst';
import { useAdminAuth } from '../context/AdminAuthContext';
import ThemeToggle from '../components/ThemeToggle';
import logo from '../assets/logo.png';

export default function AdminReports() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [period, setPeriod] = useState<GSTPeriod>('weekly');
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const loadData = () => setOrders(getOrders());

  useEffect(() => {
    loadData();
  }, []);

  const activeOrders = useMemo(() => orders.filter((o) => o.status !== 'Cancelled'), [orders]);

  const totalRevenue = activeOrders.reduce((sum, o) => sum + o.total, 0);
  const totalSubtotal = activeOrders.reduce((sum, o) => sum + o.subtotal, 0);
  const totalGST = activeOrders.reduce((sum, o) => sum + o.gstAmount, 0);
  const totalUnits = activeOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0),
    0
  );
  const avgOrderValue = activeOrders.length ? totalRevenue / activeOrders.length : 0;
  const cancelledCount = orders.length - activeOrders.length;

  const periodBuckets = useMemo(
    () => groupOrdersByGSTPeriod(orders, period).slice(0, 12),
    [orders, period]
  );
  const maxBucketTotal = Math.max(1, ...periodBuckets.map((b) => b.total));

  // Top selling products by quantity
  const topProducts = useMemo(() => {
    const map = new Map<string, { name: string; qty: number; revenue: number }>();
    activeOrders.forEach((o) => {
      o.items.forEach((i) => {
        const existing = map.get(i.name);
        if (existing) {
          existing.qty += i.qty;
          existing.revenue += i.qty * i.price;
        } else {
          map.set(i.name, { name: i.name, qty: i.qty, revenue: i.qty * i.price });
        }
      });
    });
    return Array.from(map.values())
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 6);
  }, [activeOrders]);

  // Top cities/districts by order count
  const topCities = useMemo(() => {
    const map = new Map<string, { city: string; orders: number; revenue: number }>();
    activeOrders.forEach((o) => {
      const city = o.cityDistrict || 'Unspecified';
      const existing = map.get(city);
      if (existing) {
        existing.orders += 1;
        existing.revenue += o.total;
      } else {
        map.set(city, { city, orders: 1, revenue: o.total });
      }
    });
    return Array.from(map.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);
  }, [activeOrders]);

  function handleExportCSV() {
    const header = ['Order ID', 'Customer', 'City', 'Status', 'Subtotal', 'GST', 'Total', 'Placed At'];
    const rows = orders.map((o) => [
      o.id,
      o.customerName,
      o.cityDistrict || '',
      o.status,
      o.subtotal,
      o.gstAmount,
      o.total,
      new Date(o.placedAt).toLocaleString('en-IN')
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `urbanthreads-sales-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-ink min-h-screen flex flex-col md:flex-row text-bone">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal/90 border-r border-hairline/10 p-6 flex flex-col justify-between shrink-0 shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="Urban Threads" className="w-10 h-10 rounded-full object-cover border border-gold/40 shadow" />
            <div>
              <span className="font-display text-xl tracking-widest text-bone leading-none">
                URBAN<span className="text-gold">THREADS</span>
              </span>
              <p className="text-[10px] uppercase tracking-wider text-gold font-bold">Admin Portal</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-boneDim hover:text-bone hover:bg-hairline/5 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <LayoutDashboard size={16} className="text-gold" /> Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-boneDim hover:text-bone hover:bg-hairline/5 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <Package size={16} className="text-gold" /> Orders Management
            </Link>
            <Link
              to="/admin/reports"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gold text-onGold font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20"
            >
              <BarChart3 size={16} /> Sales Report
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-boneDim hover:text-bone hover:bg-hairline/5 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <ShoppingBag size={16} className="text-gold" /> Catalog View
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-boneDim hover:text-bone hover:bg-hairline/5 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <Store size={16} className="text-slate-400" /> View Storefront
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-hairline/10 mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-boneDim">
            <ShieldCheck size={14} className="text-slate-400" />
            <span>Store Admin (Mohanur)</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-charcoal border border-hairline/10 text-boneDim hover:text-red-400 hover:border-red-400/40 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-gold uppercase tracking-[0.25em] text-xs font-bold">
              Control Center • Mohanur, Namakkal
            </span>
            <h1 className="font-display text-4xl text-bone tracking-wide mt-1">Sales Report</h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 bg-panel hover:bg-panel/80 border border-hairline/10 text-bone text-xs font-semibold px-4 py-2.5 rounded-full transition-colors"
            >
              <RefreshCw size={13} className="text-gold" /> Refresh
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 bg-gold hover:bg-goldDeep text-onGold font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors shadow-lg shadow-gold/20"
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-panel rounded-3xl p-6 border border-gold/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gold text-xs uppercase tracking-wider font-semibold">
                Total Revenue
              </span>
              <TrendingUp size={20} className="text-gold" />
            </div>
            <p className="font-display text-2xl sm:text-3xl text-gold font-bold font-mono">
              {formatINR(totalRevenue)}
            </p>
            <span className="text-[11px] text-boneDim">{activeOrders.length} active orders</span>
          </div>

          <div className="bg-panel rounded-3xl p-6 border border-hairline/10 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-boneDim text-xs uppercase tracking-wider font-semibold">
                Sales (Excl. GST)
              </span>
              <Receipt size={20} className="text-blue-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl text-bone font-bold font-mono">
              {formatINR(totalSubtotal)}
            </p>
            <span className="text-[11px] text-boneDim">GST collected: {formatINR(totalGST)}</span>
          </div>

          <div className="bg-panel rounded-3xl p-6 border border-hairline/10 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-boneDim text-xs uppercase tracking-wider font-semibold">
                Avg. Order Value
              </span>
              <BarChart3 size={20} className="text-slate-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl text-bone font-bold font-mono">
              {formatINR(avgOrderValue)}
            </p>
            <span className="text-[11px] text-boneDim">{totalUnits} units sold total</span>
          </div>

          <div className="bg-panel rounded-3xl p-6 border border-hairline/10 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-boneDim text-xs uppercase tracking-wider font-semibold">
                Cancelled Orders
              </span>
              <Package size={20} className="text-red-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl text-red-400 font-bold font-mono">
              {cancelledCount}
            </p>
            <span className="text-[11px] text-boneDim">Excluded from revenue totals</span>
          </div>
        </div>

        {/* Revenue trend */}
        <div className="bg-panel rounded-3xl p-6 sm:p-8 border border-hairline/10 shadow-2xl mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl text-bone tracking-wide">Revenue Trend</h2>
              <p className="text-boneDim text-xs mt-0.5">
                Order value grouped {period}, most recent period first.
              </p>
            </div>
            <div className="flex bg-charcoal rounded-full p-1 border border-hairline/10 w-fit">
              <button
                onClick={() => setPeriod('weekly')}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  period === 'weekly' ? 'bg-gold text-onGold' : 'text-boneDim hover:text-bone'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setPeriod('monthly')}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  period === 'monthly' ? 'bg-gold text-onGold' : 'text-boneDim hover:text-bone'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {periodBuckets.length === 0 ? (
            <div className="text-center py-10 bg-charcoal/60 rounded-2xl border border-hairline/5">
              <BarChart3 size={32} className="text-boneDim mx-auto mb-2" />
              <p className="text-boneDim text-sm">No sales data yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {periodBuckets.map((b) => (
                <div key={b.key} className="flex items-center gap-4">
                  <span className="text-xs text-boneDim w-28 shrink-0 font-mono">{b.label}</span>
                  <div className="flex-1 bg-charcoal/60 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold/70 to-gold rounded-full transition-all"
                      style={{ width: `${(b.total / maxBucketTotal) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-bone font-mono font-bold w-28 text-right shrink-0">
                    {formatINR(b.total)}
                  </span>
                  <span className="text-[10px] text-boneDim w-16 text-right shrink-0">
                    {b.orderCount} orders
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top products & top cities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-panel rounded-3xl p-6 sm:p-8 border border-hairline/10 shadow-2xl">
            <h2 className="font-display text-2xl text-bone tracking-wide mb-1 flex items-center gap-2">
              <Trophy size={20} className="text-gold" /> Top Selling Products
            </h2>
            <p className="text-boneDim text-xs mb-5">Ranked by units sold across all orders.</p>

            {topProducts.length === 0 ? (
              <p className="text-boneDim text-sm text-center py-8">No sales yet.</p>
            ) : (
              <div className="space-y-3">
                {topProducts.map((p, idx) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between gap-3 bg-charcoal/60 rounded-xl p-3.5 border border-hairline/5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 text-gold text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-bone text-xs font-semibold truncate">{p.name}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gold text-xs font-mono font-bold">{p.qty} pcs</p>
                      <p className="text-boneDim text-[10px] font-mono">{formatINR(p.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-panel rounded-3xl p-6 sm:p-8 border border-hairline/10 shadow-2xl">
            <h2 className="font-display text-2xl text-bone tracking-wide mb-1 flex items-center gap-2">
              <MapPin size={20} className="text-gold" /> Top Cities / Districts
            </h2>
            <p className="text-boneDim text-xs mb-5">Ranked by revenue across Tamil Nadu.</p>

            {topCities.length === 0 ? (
              <p className="text-boneDim text-sm text-center py-8">No sales yet.</p>
            ) : (
              <div className="space-y-3">
                {topCities.map((c, idx) => (
                  <div
                    key={c.city}
                    className="flex items-center justify-between gap-3 bg-charcoal/60 rounded-xl p-3.5 border border-hairline/5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 text-gold text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-bone text-xs font-semibold truncate">{c.city}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gold text-xs font-mono font-bold">{formatINR(c.revenue)}</p>
                      <p className="text-boneDim text-[10px] font-mono">{c.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
