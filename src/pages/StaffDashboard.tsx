import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  LogOut,
  Search,
  CheckCircle2,
  Truck,
  Phone,
  MapPin,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { getOrders, updatePackagingStatus, Order } from '../utils/ordersStore';
import { formatINR } from '../utils/gst';
import { useAdminAuth } from '../context/AdminAuthContext';
import ThemeToggle from '../components/ThemeToggle';
import logo from '../assets/logo.png';

const PACKAGING_STEPS: NonNullable<Order['packagingStatus']>[] = [
  'Pending',
  'Packed',
  'Handed to Courier'
];

export default function StaffDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { staffId, displayName, logout } = useAdminAuth();
  const navigate = useNavigate();

  const loadData = () => setOrders(getOrders());

  useEffect(() => {
    loadData();
  }, []);

  const myOrders = useMemo(() => {
    const mine = orders.filter((o) => o.assignedStaffId === staffId);
    const q = searchQuery.toLowerCase().trim();
    if (!q) return mine;
    return mine.filter(
      (o) => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)
    );
  }, [orders, staffId, searchQuery]);

  const pendingCount = myOrders.filter((o) => (o.packagingStatus ?? 'Pending') === 'Pending').length;
  const packedCount = myOrders.filter((o) => o.packagingStatus === 'Packed').length;
  const shippedCount = myOrders.filter((o) => o.packagingStatus === 'Handed to Courier').length;

  function handleAdvance(order: Order) {
    const current = order.packagingStatus ?? 'Pending';
    const idx = PACKAGING_STEPS.indexOf(current);
    const next = PACKAGING_STEPS[Math.min(idx + 1, PACKAGING_STEPS.length - 1)];
    updatePackagingStatus(order.id, next);
    loadData();
  }

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="bg-ink min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur-md border-b border-hairline/10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Urban Threads" className="w-9 h-9 rounded-full object-cover border border-gold/40" />
            <div className="flex flex-col">
              <span className="font-display text-lg text-bone tracking-widest leading-none">
                STAFF PORTAL
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-boneDim font-medium">
                {displayName ?? 'Packaging'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle className="hidden sm:inline-flex" />
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-boneDim hover:text-rust transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-2">
            <ShieldCheck size={13} />
            <span>Packaging &amp; Order Handling</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-bone tracking-wide">
            Your Assigned Orders
          </h1>
          <p className="text-boneDim text-sm mt-1">
            Orders are split automatically between staff members — you only see and manage the
            ones assigned to you.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-panel border border-hairline/10 rounded-xl p-4">
            <p className="text-boneDim text-[11px] uppercase tracking-wider mb-1">Pending</p>
            <p className="text-2xl font-bold text-bone">{pendingCount}</p>
          </div>
          <div className="bg-panel border border-hairline/10 rounded-xl p-4">
            <p className="text-boneDim text-[11px] uppercase tracking-wider mb-1">Packed</p>
            <p className="text-2xl font-bold text-gold">{packedCount}</p>
          </div>
          <div className="bg-panel border border-hairline/10 rounded-xl p-4">
            <p className="text-boneDim text-[11px] uppercase tracking-wider mb-1">Shipped</p>
            <p className="text-2xl font-bold text-slate-400">{shippedCount}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-boneDim" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID or customer name..."
            className="w-full bg-panel border border-hairline/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
          />
        </div>

        {/* Orders list */}
        {myOrders.length === 0 ? (
          <div className="text-center py-16 text-boneDim text-sm bg-panel border border-hairline/10 rounded-2xl">
            No orders assigned to you right now.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myOrders.map((order) => {
              const status = order.packagingStatus ?? 'Pending';
              const isFinal = status === 'Handed to Courier';
              return (
                <div
                  key={order.id}
                  className="bg-panel border border-hairline/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-display text-lg text-bone">{order.id}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          status === 'Pending'
                            ? 'bg-slate-500/15 text-slate-300'
                            : status === 'Packed'
                              ? 'bg-gold/15 text-gold'
                              : 'bg-slate-500/15 text-slate-400'
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="text-bone text-sm font-medium">{order.customerName}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-boneDim mt-1">
                      <span className="inline-flex items-center gap-1">
                        <Phone size={12} /> {order.customerPhone}
                      </span>
                      {order.cityDistrict && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} /> {order.cityDistrict}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {new Date(order.placedAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-boneDim text-xs mt-2">
                      {order.items.map((i) => `${i.name} (${i.size}) x${i.qty}`).join(', ')}
                    </p>
                    <p className="text-bone font-bold text-sm mt-1">{formatINR(order.total)}</p>
                  </div>

                  <div className="flex sm:flex-col items-stretch gap-2 sm:w-48">
                    <button
                      onClick={() => handleAdvance(order)}
                      disabled={isFinal}
                      className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider py-2.5 rounded-full transition-colors ${
                        isFinal
                          ? 'bg-charcoal text-boneDim cursor-not-allowed'
                          : 'bg-gold text-onGold hover:bg-goldDeep shadow-lg shadow-gold/20'
                      }`}
                    >
                      {status === 'Pending' && (
                        <>
                          <Package size={13} /> Mark Packed
                        </>
                      )}
                      {status === 'Packed' && (
                        <>
                          <Truck size={13} /> Hand to Courier
                        </>
                      )}
                      {isFinal && (
                        <>
                          <CheckCircle2 size={13} /> Completed
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
