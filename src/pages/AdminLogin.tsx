import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function AdminLogin() {
  const { login, role } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      const target = username.trim().toLowerCase() === 'admin' ? '/admin/dashboard' : '/staff/dashboard';
      navigate(target);
    } else {
      setError('Incorrect username or password');
    }
  }

  return (
    <div className="bg-ink min-h-screen flex items-center justify-center px-6 relative">
      <ThemeToggle className="absolute top-5 right-5" />
      <form onSubmit={handleSubmit} className="bg-panel border border-hairline/10 rounded-2xl p-10 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Lock size={24} className="text-gold" />
          </div>
        </div>
        <h1 className="font-display text-3xl text-bone text-center tracking-wide mb-1">Portal login</h1>
        <p className="text-boneDim text-sm text-center mb-8">Urban Threads admin &amp; staff access</p>

        <div className="flex flex-col gap-4 mb-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-charcoal border border-hairline/10 rounded-lg px-4 py-3 text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-charcoal border border-hairline/10 rounded-lg px-4 py-3 text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50 text-sm"
          />
        </div>
        {error && <p className="text-rust text-xs mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gold text-onGold font-semibold py-3 rounded-full uppercase text-sm tracking-wider hover:bg-goldDeep transition-colors"
        >
          Log in
        </button>
        <p className="text-boneDim text-xs mt-6 text-center leading-relaxed">
          Demo credentials — Admin: admin / urban2026 · Staff 1: staff1 / staff1pack · Staff 2:
          staff2 / staff2pack. Replace with real backend auth before going live.
        </p>
      </form>
    </div>
  );
}
