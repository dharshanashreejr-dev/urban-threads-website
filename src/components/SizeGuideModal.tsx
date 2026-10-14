import { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';

interface SizeGuideModalProps {
  category?: 'Shirts' | 'T-Shirts' | 'Trousers' | 'Jeans' | 'Ethnic' | 'Formal' | 'All';
  onClose: () => void;
}

export default function SizeGuideModal({ category = 'Shirts', onClose }: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'Shirts' | 'T-Shirts' | 'Trousers' | 'Jeans' | 'Ethnic' | 'Formal'>(
    category === 'All' ? 'Shirts' : category === 'Formal' ? 'Formal' : category
  );
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  const chartData = {
    Shirts: [
      { size: 'S (38)', chestIn: '38', chestCm: '96.5', shoulderIn: '17.5', shoulderCm: '44.5', lengthIn: '28.5', lengthCm: '72.4' },
      { size: 'M (40)', chestIn: '40', chestCm: '101.6', shoulderIn: '18.0', shoulderCm: '45.7', lengthIn: '29.5', lengthCm: '74.9' },
      { size: 'L (42)', chestIn: '42', chestCm: '106.7', shoulderIn: '18.5', shoulderCm: '47.0', lengthIn: '30.5', lengthCm: '77.5' },
      { size: 'XL (44)', chestIn: '44', chestCm: '111.8', shoulderIn: '19.2', shoulderCm: '48.8', lengthIn: '31.5', lengthCm: '80.0' },
      { size: 'XXL (46)', chestIn: '46', chestCm: '116.8', shoulderIn: '20.0', shoulderCm: '50.8', lengthIn: '32.5', lengthCm: '82.5' }
    ],
    'T-Shirts': [
      { size: 'S', chestIn: '36-38', chestCm: '91-96', shoulderIn: '17.0', shoulderCm: '43.2', lengthIn: '27.0', lengthCm: '68.5' },
      { size: 'M', chestIn: '38-40', chestCm: '96-101', shoulderIn: '17.5', shoulderCm: '44.5', lengthIn: '28.0', lengthCm: '71.1' },
      { size: 'L', chestIn: '40-42', chestCm: '101-106', shoulderIn: '18.2', shoulderCm: '46.2', lengthIn: '29.0', lengthCm: '73.6' },
      { size: 'XL', chestIn: '42-44', chestCm: '106-111', shoulderIn: '19.0', shoulderCm: '48.3', lengthIn: '30.0', lengthCm: '76.2' },
      { size: 'XXL', chestIn: '44-46', chestCm: '111-116', shoulderIn: '19.8', shoulderCm: '50.3', lengthIn: '31.0', lengthCm: '78.7' }
    ],
    Trousers: [
      { size: '30', waistIn: '30', waistCm: '76.2', hipIn: '38', hipCm: '96.5', lengthIn: '40.5', lengthCm: '102.8' },
      { size: '32', waistIn: '32', waistCm: '81.3', hipIn: '40', hipCm: '101.6', lengthIn: '41.0', lengthCm: '104.1' },
      { size: '34', waistIn: '34', waistCm: '86.4', hipIn: '42', hipCm: '106.7', lengthIn: '41.5', lengthCm: '105.4' },
      { size: '36', waistIn: '36', waistCm: '91.4', hipIn: '44', hipCm: '111.8', lengthIn: '42.0', lengthCm: '106.7' },
      { size: '38', waistIn: '38', waistCm: '96.5', hipIn: '46', hipCm: '116.8', lengthIn: '42.5', lengthCm: '108.0' }
    ],
    Jeans: [
      { size: '30', waistIn: '30', waistCm: '76.2', hipIn: '38', hipCm: '96.5', lengthIn: '40.0', lengthCm: '101.6' },
      { size: '32', waistIn: '32', waistCm: '81.3', hipIn: '40', hipCm: '101.6', lengthIn: '40.5', lengthCm: '102.8' },
      { size: '34', waistIn: '34', waistCm: '86.4', hipIn: '42', hipCm: '106.7', lengthIn: '41.0', lengthCm: '104.1' },
      { size: '36', waistIn: '36', waistCm: '91.4', hipIn: '44', hipCm: '111.8', lengthIn: '41.5', lengthCm: '105.4' },
      { size: '38', waistIn: '38', waistCm: '96.5', hipIn: '46', hipCm: '116.8', lengthIn: '42.0', lengthCm: '106.7' }
    ],
    Ethnic: [
      { size: 'M (38)', chestIn: '40', chestCm: '101.6', lengthIn: '42.0', lengthCm: '106.7', shoulderIn: '18.0', shoulderCm: '45.7' },
      { size: 'L (40)', chestIn: '42', chestCm: '106.7', lengthIn: '43.0', lengthCm: '109.2', shoulderIn: '18.5', shoulderCm: '47.0' },
      { size: 'XL (42)', chestIn: '44', chestCm: '111.8', lengthIn: '44.0', lengthCm: '111.8', shoulderIn: '19.0', shoulderCm: '48.3' },
      { size: 'XXL (44)', chestIn: '46', chestCm: '116.8', lengthIn: '45.0', lengthCm: '114.3', shoulderIn: '19.5', shoulderCm: '49.5' }
    ],
    Formal: [
      { size: 'M', chestIn: '40', chestCm: '101.6', shoulderIn: '18.0', shoulderCm: '45.7', lengthIn: '29.5', lengthCm: '74.9' },
      { size: 'L', chestIn: '42', chestCm: '106.7', shoulderIn: '18.5', shoulderCm: '47.0', lengthIn: '30.5', lengthCm: '77.5' },
      { size: 'XL', chestIn: '44', chestCm: '111.8', shoulderIn: '19.2', shoulderCm: '48.8', lengthIn: '31.5', lengthCm: '80.0' },
      { size: 'XXL', chestIn: '46', chestCm: '116.8', shoulderIn: '20.0', shoulderCm: '50.8', lengthIn: '32.5', lengthCm: '82.5' }
    ]
  };

  const currentList = chartData[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/85 backdrop-blur-md">
      <div className="bg-panel border border-hairline/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-boneDim hover:text-bone"
          aria-label="Close Size Guide"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
            <Ruler size={20} />
          </div>
          <div>
            <h3 className="font-display text-2xl text-bone tracking-wide">
              Official Size &amp; Measurement Guide
            </h3>
            <p className="text-boneDim text-xs">Standardized Indian tailoring measurements</p>
          </div>
        </div>

        {/* Category Tabs & Unit Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-6 border-b border-hairline/10 pb-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {(['Shirts', 'T-Shirts', 'Trousers', 'Jeans', 'Ethnic', 'Formal'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gold text-onGold'
                    : 'bg-charcoal text-boneDim hover:text-bone'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-charcoal p-1 rounded-full border border-hairline/10 self-end sm:self-auto">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                unit === 'in' ? 'bg-gold text-onGold' : 'text-boneDim hover:text-bone'
              }`}
            >
              Inches (&quot;)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                unit === 'cm' ? 'bg-gold text-onGold' : 'text-boneDim hover:text-bone'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-hairline/10 bg-charcoal/50 mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-ink/80 text-gold uppercase tracking-wider text-[11px] border-b border-hairline/10">
              <tr>
                <th className="p-3.5">Size Tag</th>
                {activeTab === 'Trousers' || activeTab === 'Jeans' ? (
                  <>
                    <th className="p-3.5">Waist ({unit})</th>
                    <th className="p-3.5">Hip ({unit})</th>
                    <th className="p-3.5">Length ({unit})</th>
                  </>
                ) : (
                  <>
                    <th className="p-3.5">Chest ({unit})</th>
                    <th className="p-3.5">Shoulder ({unit})</th>
                    <th className="p-3.5">Length ({unit})</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline/5 text-bone">
              {currentList.map((row: any, idx) => (
                <tr key={idx} className="hover:bg-hairline/5 transition-colors">
                  <td className="p-3.5 font-bold text-gold">{row.size}</td>
                  {activeTab === 'Trousers' || activeTab === 'Jeans' ? (
                    <>
                      <td className="p-3.5">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                      <td className="p-3.5">{unit === 'in' ? row.hipIn : row.hipCm}</td>
                      <td className="p-3.5">{unit === 'in' ? row.lengthIn : row.lengthCm}</td>
                    </>
                  ) : (
                    <>
                      <td className="p-3.5">{unit === 'in' ? row.chestIn : row.chestCm}</td>
                      <td className="p-3.5">{unit === 'in' ? row.shoulderIn : row.shoulderCm}</td>
                      <td className="p-3.5">{unit === 'in' ? row.lengthIn : row.lengthCm}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pro Tip */}
        <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 flex items-start gap-3 text-xs text-boneDim">
          <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
          <div>
            <strong className="text-bone">Pro Fit Advice:</strong> If you prefer a relaxed or layered fit, order one size up. For shirts and kurtas, measurements refer to garment dimensions. For denim and trousers, select your actual waist size in inches.
          </div>
        </div>
      </div>
    </div>
  );
}
