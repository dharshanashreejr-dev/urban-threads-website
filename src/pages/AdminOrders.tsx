import { imageForItemName } from '../data/products';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  LogOut,
  ShoppingBag,
  Store,
  ShieldCheck,
  Search,
  Filter,
  Truck,
  MessageCircle,
  Phone,
  CheckCircle2,
  ExternalLink,
  MapPin,
  BarChart3
} from 'lucide-react';
import { getOrders, updateOrderStatus, Order } from '../utils/ordersStore';
import { formatINR } from '../utils/gst';
import { useAdminAuth } from '../context/AdminAuthContext';
import ThemeToggle from '../components/ThemeToggle';
import logo from '../assets/logo.png';

const STATUS_OPTIONS: Order['status'][] = ['New', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTrackingId, setEditingTrackingId] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [courierInput, setCourierInput] = useState('ST Courier');

  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const loadData = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    loadData();
  }, []);

  function handleStatusChange(id: string, status: Order['status']) {
    updateOrderStatus(id, status);
    loadData();
  }

  function handleSaveTracking(id: string) {
    updateOrderStatus(id, 'Dispatched', courierInput, trackingInput);
    setEditingTrackingId(null);
    setTrackingInput('');
    loadData();
  }

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'All' || o.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      (o.cityDistrict && o.cityDistrict.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

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
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-boneDim hover:text-bone hover:bg-hairline/5 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <LayoutDashboard size={16} className="text-gold" /> Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gold text-onGold font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20"
            >
              <Package size={16} /> Orders Management
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

      {/* Main Orders Content */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-gold uppercase tracking-[0.25em] text-xs font-bold">
              Orders Database &amp; Dispatch
            </span>
            <h1 className="font-display text-4xl text-bone tracking-wide mt-1">
              Customer Orders ({orders.length})
            </h1>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-boneDim" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Order ID, Name, Phone..."
                className="w-full bg-panel border border-hairline/10 rounded-full pl-9 pr-4 py-2 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
              />
            </div>
            <ThemeToggle className="shrink-0" />
          </div>
        </div>

        {/* Filter Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {['All', 'New', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'].map((status) => {
            const count =
              status === 'All'
                ? orders.length
                : orders.filter((o) => o.status === status).length;
            const isSelected = filterStatus === status;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-xs uppercase font-bold tracking-wider transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-gold text-onGold border-gold shadow-lg shadow-gold/20'
                    : 'bg-panel border-hairline/10 text-boneDim hover:text-bone hover:border-gold/30'
                }`}
              >
                {status} <span className="opacity-70 ml-1">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-panel rounded-3xl p-16 text-center border border-hairline/10 shadow-xl">
            <Package size={40} className="text-boneDim mx-auto mb-3" />
            <p className="text-bone text-base font-semibold">No orders matched your filter.</p>
            <button
              onClick={() => {
                setFilterStatus('All');
                setSearchQuery('');
              }}
              className="mt-3 text-gold text-xs underline uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((o) => (
              <div
                key={o.id}
                className="bg-panel rounded-3xl p-6 sm:p-7 border border-hairline/10 shadow-2xl hover:border-gold/30 transition-all"
              >
                {/* Header: Order ID, Timestamp, Status & WhatsApp */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline/10">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono font-bold text-gold text-lg">{o.id}</span>
                      <span className="text-boneDim text-xs font-mono">
                        {new Date(o.placedAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </span>
                      {o.assignedStaffId && (
                        <span className="inline-flex items-center gap-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-gold/30">
                          Staff {o.assignedStaffId} · {o.packagingStatus ?? 'Pending'}
                        </span>
                      )}
                    </div>
                    <p className="text-bone text-sm font-semibold mt-1">
                      {o.customerName} • <span className="font-mono text-boneDim">{o.customerPhone}</span>
                    </p>
                  </div>

                  {/* Status Dropdown & WhatsApp Action */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-boneDim uppercase tracking-wider">Status:</span>
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as Order['status'])}
                        className={`font-semibold text-xs rounded-xl px-3 py-2 border focus:outline-none cursor-pointer ${
                          o.status === 'New'
                            ? 'bg-slate-950/60 text-slate-300 border-slate-700/50'
                            : o.status === 'Dispatched'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-700/50'
                            : o.status === 'Delivered'
                            ? 'bg-slate-950/60 text-slate-300 border-slate-700/50'
                            : 'bg-charcoal text-bone border-hairline/10'
                        }`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-charcoal text-bone">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <a
                      href={`https://wa.me/91${o.customerPhone.replace(/\D/g, '')}?text=Vanakkam%20${encodeURIComponent(
                        o.customerName
                      )},%20update%20regarding%20your%20order%20${o.id}%20from%20Urban%20Threads%20Mohanur...`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-600/20 hover:bg-slate-600 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors border border-slate-600/30"
                    >
                      <MessageCircle size={14} /> WhatsApp Customer
                    </a>
                  </div>
                </div>

                {/* Body: Delivery Address & Ordered Items */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-5 border-b border-hairline/10">
                  {/* Shipping Address */}
                  <div className="lg:col-span-5 bg-charcoal/60 rounded-2xl p-4 border border-hairline/5">
                    <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2 flex items-center gap-1.5">
                      <MapPin size={13} /> Delivery Destination
                    </p>
                    <p className="text-bone text-xs leading-relaxed">
                      {o.deliveryAddress || 'Direct Store Pickup (15/8 Velur Road, Mohanur)'}
                    </p>
                    <p className="text-boneDim text-xs mt-1">
                      {o.cityDistrict || 'Mohanur'} {o.pincode && `— ${o.pincode}`}
                    </p>

                    {/* Tracking Info if any */}
                    {o.trackingNumber ? (
                      <div className="mt-3 pt-3 border-t border-hairline/5 text-xs">
                        <span className="text-slate-400 font-semibold flex items-center gap-1">
                          <Truck size={12} /> {o.courierPartner || 'ST Courier'}: {o.trackingNumber}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingTrackingId(o.id);
                          setTrackingInput('');
                        }}
                        className="mt-3 text-gold text-[11px] hover:underline flex items-center gap-1"
                      >
                        + Add Courier Tracking Number
                      </button>
                    )}

                    {/* Tracking Input Modal inline */}
                    {editingTrackingId === o.id && (
                      <div className="mt-3 pt-3 border-t border-hairline/5 space-y-2">
                        <input
                          value={courierInput}
                          onChange={(e) => setCourierInput(e.target.value)}
                          placeholder="Courier (ST Courier, Professional, DTDC)"
                          className="w-full bg-ink border border-hairline/10 rounded-lg px-3 py-1.5 text-xs text-bone"
                        />
                        <input
                          value={trackingInput}
                          onChange={(e) => setTrackingInput(e.target.value)}
                          placeholder="Tracking AWB Number"
                          className="w-full bg-ink border border-hairline/10 rounded-lg px-3 py-1.5 text-xs text-bone"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveTracking(o.id)}
                            className="bg-gold text-onGold font-bold px-3 py-1 rounded-lg text-xs"
                          >
                            Save &amp; Dispatch
                          </button>
                          <button
                            onClick={() => setEditingTrackingId(null)}
                            className="text-boneDim text-xs hover:text-bone"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Items Ordered List */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-boneDim font-semibold mb-2">
                        Ordered Outfits:
                      </p>
                      {o.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs bg-charcoal/40 p-2.5 rounded-xl border border-hairline/5"
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image ?? imageForItemName(item.name)}
                              alt={item.name}
                              className="w-10 h-12 rounded-lg object-cover border border-hairline/10 shrink-0"
                            />
                            <span className="text-bone font-medium truncate max-w-xs">
                              {item.name} <span className="text-gold">({item.size})</span>
                            </span>
                          </span>
                          <span className="text-boneDim font-mono">
                            {item.qty} × ₹{item.price} ={' '}
                            <strong className="text-bone">₹{item.price * item.qty}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer: Price Summary */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-boneDim gap-3">
                  <div>
                    <span>Subtotal: {formatINR(o.subtotal)}</span>
                    <span className="mx-2">•</span>
                    <span>GST (5%): {formatINR(o.gstAmount)}</span>
                  </div>
                  <div className="text-base font-bold text-bone flex items-center gap-2">
                    <span>Total Amount:</span>
                    <span className="text-gold font-mono text-xl">{formatINR(o.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
