import { imageForItemName } from '../data/products';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  LogOut,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  MessageCircle,
  Phone,
  ShieldCheck,
  Store,
  RefreshCw,
  Receipt,
  BarChart3
} from 'lucide-react';
import { getOrders, Order } from '../utils/ordersStore';
import { getStockMap, refillStock } from '../utils/stockStore';
import { products } from '../data/products';
import { formatINR, groupOrdersByGSTPeriod, GSTPeriod } from '../utils/gst';
import { useAdminAuth } from '../context/AdminAuthContext';
import ThemeToggle from '../components/ThemeToggle';
import logo from '../assets/logo.png';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [gstPeriod, setGstPeriod] = useState<GSTPeriod>('weekly');
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const loadData = () => {
    setOrders(getOrders());
    setStockMap(getStockMap());
  };

  useEffect(() => {
    loadData();
  }, []);

  function handleRefill(productId: string) {
    refillStock(productId, 50);
    loadData();
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const newOrders = orders.filter((o) => o.status === 'New').length;
  const dispatchedOrders = orders.filter((o) => o.status === 'Dispatched').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  const gstBuckets = groupOrdersByGSTPeriod(orders, gstPeriod).slice(0, 8);
  const totalGSTCollected = gstBuckets.reduce((sum, b) => sum + b.gstAmount, 0);

  return (
    <div className="bg-ink min-h-screen flex flex-col md:flex-row text-bone">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal/90 border-r border-hairline/10 p-6 flex flex-col justify-between shrink-0 shadow-2xl">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="Urban Threads" className="w-10 h-10 rounded-full object-cover border border-gold/40 shadow" />
            <div>
              <span className="font-display text-xl tracking-widest text-bone leading-none">
                URBAN<span className="text-gold">THREADS</span>
              </span>
              <p className="text-[10px] uppercase tracking-wider text-gold font-bold">Admin Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gold text-onGold font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20"
            >
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-boneDim hover:text-bone hover:bg-hairline/5 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <Package size={16} className="text-gold" /> Orders Management
              {newOrders > 0 && (
                <span className="ml-auto bg-slate-500 text-onGold text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {newOrders}
                </span>
              )}
            </Link>
            <Link
              to="/admin/reports"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-boneDim hover:text-bone hover:bg-hairline/5 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <BarChart3 size={16} className="text-gold" /> Sales Report
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

        {/* User Info & Logout */}
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

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-gold uppercase tracking-[0.25em] text-xs font-bold">
              Control Center • Mohanur, Namakkal
            </span>
            <h1 className="font-display text-4xl text-bone tracking-wide mt-1">
              Admin Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 bg-panel hover:bg-panel/80 border border-hairline/10 text-bone text-xs font-semibold px-4 py-2.5 rounded-full transition-colors"
            >
              <RefreshCw size={13} className="text-gold" /> Refresh
            </button>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-2 bg-gold hover:bg-goldDeep text-onGold font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors shadow-lg shadow-gold/20"
            >
              <Package size={14} /> Manage All Orders
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-panel rounded-3xl p-6 border border-hairline/10 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-boneDim text-xs uppercase tracking-wider font-semibold">
                Total Orders
              </span>
              <Package size={20} className="text-gold" />
            </div>
            <p className="font-display text-4xl text-bone mb-1">{orders.length}</p>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <TrendingUp size={12} /> Active in store database
            </span>
          </div>

          <div className="bg-panel rounded-3xl p-6 border border-slate-500/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                New Unprocessed
              </span>
              <Clock size={20} className="text-slate-400" />
            </div>
            <p className="font-display text-4xl text-slate-400 mb-1">{newOrders}</p>
            <span className="text-[11px] text-boneDim">Awaiting WhatsApp confirmation</span>
          </div>

          <div className="bg-panel rounded-3xl p-6 border border-hairline/10 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-boneDim text-xs uppercase tracking-wider font-semibold">
                Dispatched Courier
              </span>
              <Truck size={20} className="text-blue-400" />
            </div>
            <p className="font-display text-4xl text-blue-400 mb-1">{dispatchedOrders}</p>
            <span className="text-[11px] text-boneDim">In transit across Tamil Nadu</span>
          </div>

          <div className="bg-panel rounded-3xl p-6 border border-gold/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gold text-xs uppercase tracking-wider font-semibold">
                Total Order Value
              </span>
              <TrendingUp size={20} className="text-gold" />
            </div>
            <p className="font-display text-3xl sm:text-4xl text-gold font-bold mb-1 font-mono">
              {formatINR(totalRevenue)}
            </p>
            <span className="text-[11px] text-slate-400">5% GST included</span>
          </div>
        </div>

        {/* Stock Overview */}
        <div className="bg-panel rounded-3xl p-6 sm:p-8 border border-hairline/10 shadow-2xl mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl text-bone tracking-wide">Stock &amp; Inventory</h2>
              <p className="text-boneDim text-xs mt-0.5">
                Auto-deducted whenever a customer order is placed. Refill manually when new stock
                arrives.
              </p>
            </div>
            <span className="text-[11px] text-red-400 font-semibold uppercase tracking-wider">
              {products.filter((p) => (stockMap[p.id] ?? 0) <= 10).length} low / out of stock
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
            {products.map((p) => {
              const qty = stockMap[p.id] ?? 0;
              const low = qty <= 10;
              return (
                <div
                  key={p.id}
                  className="bg-charcoal/60 rounded-xl p-3.5 border border-hairline/5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-bone text-xs font-semibold truncate">{p.name}</p>
                    <p
                      className={`text-[11px] font-mono font-bold ${low ? 'text-red-400' : 'text-slate-400'}`}
                    >
                      {qty} units {qty === 0 ? '(Out of stock)' : low ? '(Low)' : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRefill(p.id)}
                    className="shrink-0 inline-flex items-center gap-1 bg-gold/10 hover:bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-gold/30 transition-colors"
                  >
                    +50
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* GST Breakdown */}
        <div className="bg-panel rounded-3xl p-6 sm:p-8 border border-hairline/10 shadow-2xl mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl text-bone tracking-wide flex items-center gap-2">
                <Receipt size={20} className="text-gold" /> GST Collected
              </h2>
              <p className="text-boneDim text-xs mt-0.5">
                Breakdown of 5% GST collected on storefront sales, grouped {gstPeriod}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-charcoal rounded-full p-1 border border-hairline/10">
                <button
                  onClick={() => setGstPeriod('weekly')}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    gstPeriod === 'weekly' ? 'bg-gold text-onGold' : 'text-boneDim hover:text-bone'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setGstPeriod('monthly')}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    gstPeriod === 'monthly' ? 'bg-gold text-onGold' : 'text-boneDim hover:text-bone'
                  }`}
                >
                  Monthly
                </button>
              </div>
              <Link
                to="/admin/reports"
                className="text-gold hover:underline text-xs uppercase tracking-wider font-bold flex items-center gap-1 shrink-0"
              >
                Full Report <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gold/10 to-panel border border-gold/20 rounded-2xl p-4 mb-5 flex items-center justify-between">
            <span className="text-xs text-boneDim uppercase tracking-wider font-semibold">
              Total GST Collected ({gstPeriod === 'weekly' ? 'last 8 weeks' : 'last 8 months'})
            </span>
            <span className="font-display text-2xl text-gold font-bold font-mono">
              {formatINR(totalGSTCollected)}
            </span>
          </div>

          {gstBuckets.length === 0 ? (
            <div className="text-center py-10 bg-charcoal/60 rounded-2xl border border-hairline/5">
              <Receipt size={32} className="text-boneDim mx-auto mb-2" />
              <p className="text-boneDim text-sm">No GST data yet — place an order to see the breakdown.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-boneDim uppercase tracking-wider text-[10px] border-b border-hairline/10">
                    <th className="text-left py-2 pr-3 font-semibold">
                      {gstPeriod === 'weekly' ? 'Week' : 'Month'}
                    </th>
                    <th className="text-right py-2 px-3 font-semibold">Orders</th>
                    <th className="text-right py-2 px-3 font-semibold">Subtotal</th>
                    <th className="text-right py-2 px-3 font-semibold">GST (5%)</th>
                    <th className="text-right py-2 pl-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {gstBuckets.map((b) => (
                    <tr key={b.key} className="border-b border-hairline/5 last:border-0">
                      <td className="py-2.5 pr-3 text-bone font-semibold">{b.label}</td>
                      <td className="py-2.5 px-3 text-right text-boneDim font-mono">{b.orderCount}</td>
                      <td className="py-2.5 px-3 text-right text-boneDim font-mono">
                        {formatINR(b.subtotal)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-gold font-mono font-bold">
                        {formatINR(b.gstAmount)}
                      </td>
                      <td className="py-2.5 pl-3 text-right text-bone font-mono font-semibold">
                        {formatINR(b.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Live Orders Feed */}
        <div className="bg-panel rounded-3xl p-6 sm:p-8 border border-hairline/10 shadow-2xl mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl text-bone tracking-wide">
                Recent Customer Orders
              </h2>
              <p className="text-boneDim text-xs mt-0.5">
                Real-time orders placed on the storefront with customer contact details.
              </p>
            </div>
            <Link
              to="/admin/orders"
              className="text-gold hover:underline text-xs uppercase tracking-wider font-bold flex items-center gap-1"
            >
              View Full Table <ExternalLink size={13} />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 bg-charcoal/60 rounded-2xl border border-hairline/5">
              <Package size={36} className="text-boneDim mx-auto mb-3" />
              <p className="text-boneDim text-sm">No orders placed yet.</p>
              <p className="text-boneDim text-xs mt-1">
                New orders placed from the Cart will immediately show here and trigger WhatsApp to Admin.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((o) => (
                <div
                  key={o.id}
                  className="bg-charcoal/80 rounded-2xl p-5 border border-hairline/5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-gold/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="font-mono font-bold text-gold text-sm">{o.id}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                          o.status === 'New'
                            ? 'bg-slate-950/60 text-slate-300 border-slate-800/40'
                            : o.status === 'Dispatched'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-800/40'
                            : o.status === 'Delivered'
                            ? 'bg-slate-950/60 text-slate-300 border-slate-800/40'
                            : 'bg-panel text-boneDim border-hairline/10'
                        }`}
                      >
                        {o.status}
                      </span>
                      <span className="text-boneDim text-xs font-mono">
                        {new Date(o.placedAt).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-boneDim flex-wrap mt-1">
                      <span className="text-bone font-semibold">{o.customerName}</span>
                      <span>•</span>
                      <a
                        href={`tel:${o.customerPhone}`}
                        className="hover:text-gold flex items-center gap-1 font-mono"
                      >
                        <Phone size={11} /> {o.customerPhone}
                      </a>
                      <span>•</span>
                      <span>{o.cityDistrict || 'Mohanur'}</span>
                    </div>

                    {/* Ordered Items Summary */}
                    <div className="text-xs text-boneDim/90 mt-2 flex flex-wrap gap-2">
                      {o.items.map((i, idx) => (
                        <span key={idx} className="bg-ink/80 pl-0.5 pr-2 py-0.5 rounded-lg border border-hairline/5 inline-flex items-center gap-1.5">
                          <img src={i.image ?? imageForItemName(i.name)} alt={i.name} className="w-6 h-7 rounded object-cover" />
                          {i.name} ({i.size}) × {i.qty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-hairline/5">
                    <div className="text-left lg:text-right">
                      <p className="text-gold font-mono font-bold text-base">
                        {formatINR(o.total)}
                      </p>
                      <p className="text-[10px] text-boneDim">
                        {o.items.reduce((s, i) => s + i.qty, 0)} items
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/91${o.customerPhone.replace(/\D/g, '')}?text=Vanakkam%20${encodeURIComponent(
                          o.customerName
                        )},%20regarding%20your%20order%20${o.id}%20from%20Urban%20Threads%20Mohanur...`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-600/20 hover:bg-slate-600 text-slate-400 hover:text-white p-2 rounded-xl transition-colors text-xs"
                        title="Chat with Customer on WhatsApp"
                      >
                        <MessageCircle size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
