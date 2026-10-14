import { useState, useMemo } from 'react';
import {
  Star,
  MapPin,
  ExternalLink,
  ThumbsUp,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Sparkles,
  MessageSquarePlus,
  X,
  Camera,
  Share2,
  Check
} from 'lucide-react';
import { googleReviews, STORE_GOOGLE_METADATA, GoogleReview } from '../data/googleReviews';

type SortOption = 'Most relevant' | 'Newest' | 'Highest rating' | 'Lowest rating';

export default function GoogleReviewsHub() {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('Most relevant');
  const [searchQuery, setSearchQuery] = useState('');
  const [helpfulClicks, setHelpfulClicks] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userReviewText, setUserReviewText] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tags = [
    { label: 'All', count: googleReviews.length },
    { label: 'friendly owner', count: 2 },
    { label: 'Local Guide', count: googleReviews.filter((r) => r.isLocalGuide).length },
    { label: 'With Photos', count: googleReviews.filter((r) => (r.photoCount ?? 0) > 0).length },
    { label: '5 Stars', count: googleReviews.filter((r) => r.rating === 5).length },
    { label: 'Friendly Service', count: googleReviews.filter((r) => r.tags.includes('Friendly Service')).length }
  ];

  const filteredReviews = useMemo(() => {
    let list = [...googleReviews];

    // Filter by star filter if selected
    if (selectedStarFilter !== null) {
      list = list.filter((r) => r.rating === selectedStarFilter);
    }

    // Filter by tag
    if (selectedTag === 'friendly owner') {
      list = list.filter((r) => r.tags.includes('friendly owner'));
    } else if (selectedTag === 'Local Guide') {
      list = list.filter((r) => r.isLocalGuide);
    } else if (selectedTag === 'With Photos') {
      list = list.filter((r) => (r.photoCount ?? 0) > 0);
    } else if (selectedTag === '5 Stars') {
      list = list.filter((r) => r.rating === 5);
    } else if (selectedTag === 'Friendly Service') {
      list = list.filter((r) => r.tags.includes('Friendly Service'));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.authorName.toLowerCase().includes(q) ||
          r.text.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'Newest') {
      list.sort((a, b) => a.timestampDaysAgo - b.timestampDaysAgo);
    } else if (sortBy === 'Highest rating') {
      list.sort((a, b) => b.rating - a.rating || a.timestampDaysAgo - b.timestampDaysAgo);
    } else if (sortBy === 'Lowest rating') {
      list.sort((a, b) => a.rating - b.rating || a.timestampDaysAgo - b.timestampDaysAgo);
    } else {
      // Most relevant (Helpful weight + Local guide + freshness)
      list.sort((a, b) => {
        const scoreA = a.helpfulCount * 2 + (a.isLocalGuide ? 5 : 0) + (a.reactions?.length ? 3 : 0);
        const scoreB = b.helpfulCount * 2 + (b.isLocalGuide ? 5 : 0) + (b.reactions?.length ? 3 : 0);
        return scoreB - scoreA;
      });
    }

    return list;
  }, [selectedTag, selectedStarFilter, sortBy, searchQuery]);

  const toggleHelpful = (id: string) => {
    setHelpfulClicks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = (review: GoogleReview) => {
    navigator.clipboard.writeText(`${review.authorName}: "${review.text}" - Urban Threads Mohanur`);
    setCopiedId(review.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCustomReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userReviewText.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setUserReviewText('');
      setUserName('');
    }, 2500);
  };

  return (
    <section id="reviews" className="py-24 px-6 relative bg-charcoal/80 border-t border-b border-hairline/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-3">
            <Sparkles size={14} className="text-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
              Verified Google Business Reviews
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-wide">
            Voices of Mohanur Shoppers
          </h2>
          <p className="text-boneDim text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Authentic, unedited reviews from verified customers visiting our Velur Road store and wholesale consignments across Tamil Nadu.
          </p>
        </div>

        {/* Google Summary Header Card */}
        <div className="bg-ink/90 border border-hairline/10 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl backdrop-blur relative overflow-hidden">
          {/* Subtle Ambient Radial */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Store Info & Google Badge */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                {/* Google "G" Badge */}
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shrink-0">
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.36 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-bone tracking-wide">
                    {STORE_GOOGLE_METADATA.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-boneDim">
                    <CheckCircle2 size={13} className="text-slate-400" />
                    <span className="text-slate-300 font-medium">Verified Google Maps Listing</span>
                  </div>
                </div>
              </div>

              <p className="text-boneDim text-xs sm:text-sm flex items-start gap-2 mt-3 leading-relaxed">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>{STORE_GOOGLE_METADATA.address}</span>
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={STORE_GOOGLE_METADATA.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-panel hover:bg-panel/80 text-bone text-xs font-semibold px-4 py-2.5 rounded-full border border-hairline/10 transition-colors shadow"
                >
                  <ExternalLink size={14} className="text-gold" />
                  View on Google Maps
                </a>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-goldDeep text-onGold text-xs font-bold px-4 py-2.5 rounded-full transition-colors uppercase tracking-wider shadow-lg shadow-gold/20"
                >
                  <MessageSquarePlus size={14} />
                  Write a Review
                </button>
              </div>
            </div>

            {/* Center: Overall Rating Display */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 bg-charcoal/80 rounded-3xl border border-hairline/10 text-center shadow-lg">
              <span className="font-display text-6xl sm:text-7xl text-gold font-bold leading-none mb-2">
                {STORE_GOOGLE_METADATA.rating.toFixed(1)}
              </span>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={22}
                    className={
                      star <= Math.floor(STORE_GOOGLE_METADATA.rating)
                        ? 'fill-gold text-gold'
                        : star === 4
                        ? 'fill-gold/70 text-gold'
                        : 'fill-hairline/10 text-hairline/30'
                    }
                  />
                ))}
              </div>
              <span className="text-boneDim text-sm font-medium">
                Based on <strong className="text-bone font-bold">{STORE_GOOGLE_METADATA.totalReviews} Google reviews</strong>
              </span>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-950/50 border border-slate-800/40 rounded-full px-3 py-1">
                <span>⭐ 100% Unfiltered Feedback</span>
              </div>
            </div>

            {/* Right: Star Breakdown Progress Bars (Clickable to filter!) */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-2.5 bg-charcoal/60 p-5 rounded-3xl border border-hairline/10">
              <div className="flex items-center justify-between text-xs text-boneDim mb-1">
                <span className="uppercase tracking-wider font-semibold text-[11px]">Rating Breakdown</span>
                {selectedStarFilter !== null && (
                  <button
                    onClick={() => setSelectedStarFilter(null)}
                    className="text-gold text-[11px] hover:underline"
                  >
                    Clear Star Filter
                  </button>
                )}
              </div>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count =
                  STORE_GOOGLE_METADATA.ratingDistribution[
                    stars as keyof typeof STORE_GOOGLE_METADATA.ratingDistribution
                  ];
                const pct = Math.round((count / STORE_GOOGLE_METADATA.totalReviews) * 100);
                const isSelected = selectedStarFilter === stars;
                return (
                  <button
                    key={stars}
                    onClick={() =>
                      setSelectedStarFilter((prev) => (prev === stars ? null : stars))
                    }
                    className={`flex items-center gap-3 text-xs w-full p-1.5 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-gold/20 border border-gold/40'
                        : 'hover:bg-hairline/5 border border-transparent'
                    }`}
                  >
                    <span className="w-12 text-boneDim font-medium flex items-center gap-1">
                      {stars} <Star size={11} className="fill-gold text-gold" />
                    </span>
                    <div className="flex-1 bg-hairline/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gold h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-boneDim font-mono text-[11px]">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
          {/* Tag Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter size={14} className="text-gold shrink-0 hidden sm:inline" />
            {tags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => {
                  setSelectedTag(tag.label);
                  setSelectedStarFilter(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedTag === tag.label && selectedStarFilter === null
                    ? 'bg-gold text-onGold shadow-lg shadow-gold/20'
                    : 'bg-panel border border-hairline/10 text-boneDim hover:text-bone hover:border-gold/40'
                }`}
              >
                {tag.label} {tag.count > 0 && <span className="opacity-70 ml-1">({tag.count})</span>}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 md:w-56">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-boneDim" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews..."
                className="w-full bg-panel border border-hairline/10 rounded-full pl-9 pr-4 py-2 text-xs text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-boneDim hover:text-bone"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-1.5 bg-panel border border-hairline/10 rounded-full px-3 py-2 text-xs text-boneDim">
                <ArrowUpDown size={13} className="text-gold" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-bone font-medium focus:outline-none cursor-pointer pr-2"
                >
                  <option value="Most relevant" className="bg-charcoal text-bone">
                    Most relevant
                  </option>
                  <option value="Newest" className="bg-charcoal text-bone">
                    Newest
                  </option>
                  <option value="Highest rating" className="bg-charcoal text-bone">
                    Highest rating
                  </option>
                  <option value="Lowest rating" className="bg-charcoal text-bone">
                    Lowest rating
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="bg-panel rounded-3xl p-12 text-center border border-hairline/10">
            <p className="text-boneDim text-sm">No reviews matched your filters.</p>
            <button
              onClick={() => {
                setSelectedTag('All');
                setSelectedStarFilter(null);
                setSearchQuery('');
              }}
              className="mt-3 text-gold text-xs underline uppercase tracking-wider"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => {
              const isHelpful = helpfulClicks[review.id];
              const effectiveHelpful = review.helpfulCount + (isHelpful ? 1 : 0);
              const isCopied = copiedId === review.id;

              return (
                <div
                  key={review.id}
                  className="bg-panel/90 rounded-3xl p-6 sm:p-7 border border-hairline/10 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-gold/10 relative"
                >
                  {/* Top Bar: User Profile */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar Initial */}
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold via-slate-600 to-slate-800 text-onGold font-bold flex items-center justify-center text-sm shadow-md shrink-0">
                          {review.authorName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <a
                            href={review.authorUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-bone font-semibold text-sm hover:text-gold transition-colors flex items-center gap-1"
                          >
                            {review.authorName}
                            <ExternalLink size={11} className="opacity-40 group-hover:opacity-100" />
                          </a>
                          <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-boneDim mt-0.5">
                            {review.isLocalGuide && (
                              <span className="text-slate-400 font-semibold flex items-center gap-0.5">
                                ★ Local Guide
                              </span>
                            )}
                            {review.isLocalGuide && <span>•</span>}
                            <span>{review.reviewCount} reviews</span>
                            {review.photoCount && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-0.5 text-boneDim">
                                  <Camera size={10} /> {review.photoCount} photos
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* New Badge */}
                      {review.isNew && (
                        <span className="bg-gold/20 text-gold border border-gold/40 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    {/* Stars and Relative Time */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= review.rating
                                ? 'fill-gold text-gold'
                                : 'fill-hairline/10 text-hairline/30'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-boneDim text-xs font-mono">{review.relativeTime}</span>
                    </div>

                    {/* Review Text */}
                    <p className="text-bone/90 text-sm leading-relaxed mb-4 font-normal">
                      &quot;{review.text}&quot;
                    </p>

                    {/* Reactions if any */}
                    {review.reactions && review.reactions.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        {review.reactions.map((rxn, idx) => (
                          <span
                            key={idx}
                            className="bg-charcoal border border-hairline/10 rounded-full px-3 py-1 text-xs text-bone flex items-center gap-1.5"
                          >
                            <span className="text-sm">{rxn.icon}</span>
                            <span className="font-bold text-[11px] text-gold">{rxn.count}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer with Tag and Helpful Button */}
                  <div className="pt-4 border-t border-hairline/5 flex items-center justify-between text-xs">
                    <div className="flex gap-1.5 flex-wrap">
                      {review.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="bg-hairline/5 text-boneDim rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider border border-hairline/5"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleShare(review)}
                        title="Copy review quote"
                        className="p-1.5 rounded-full text-boneDim hover:text-gold hover:bg-hairline/5 transition-colors"
                      >
                        {isCopied ? <Check size={13} className="text-slate-400" /> : <Share2 size={13} />}
                      </button>

                      <button
                        onClick={() => toggleHelpful(review.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          isHelpful
                            ? 'bg-gold/20 text-gold border border-gold/40'
                            : 'text-boneDim hover:text-bone hover:bg-hairline/5'
                        }`}
                      >
                        <ThumbsUp size={12} className={isHelpful ? 'fill-gold' : ''} />
                        <span>{effectiveHelpful}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Google Reviews Footer Callout */}
        <div className="mt-14 p-8 rounded-3xl bg-panel/70 border border-hairline/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
          <div>
            <h4 className="font-display text-2xl text-bone tracking-wide">
              Visited our Velur Road Mohanur store recently?
            </h4>
            <p className="text-boneDim text-xs sm:text-sm mt-1 max-w-xl">
              Help fellow retail partners and shoppers across Tamil Nadu discover trusted men&apos;s fashion by dropping your genuine rating on Google.
            </p>
          </div>
          <a
            href={STORE_GOOGLE_METADATA.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-goldDeep text-onGold font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-gold/20"
          >
            <Star size={14} className="fill-ink" />
            Review on Google Maps
          </a>
        </div>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md">
          <div className="bg-panel border border-hairline/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-boneDim hover:text-bone"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 size={48} className="text-gold mx-auto mb-4 animate-bounce" />
                <h3 className="font-display text-2xl text-bone tracking-wide mb-2">Thank you!</h3>
                <p className="text-boneDim text-sm">
                  Your feedback has been received and helps us elevate our Mohanur collection.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCustomReviewSubmit}>
                <h3 className="font-display text-2xl text-bone tracking-wide mb-1">
                  Write a Customer Review
                </h3>
                <p className="text-boneDim text-xs mb-6">
                  Urban Threads • 15/8 Velur Road, Mohanur
                </p>

                {/* Star rating selector */}
                <div className="mb-6 text-center">
                  <p className="text-xs uppercase tracking-wider text-boneDim mb-2">Your Rating</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          size={28}
                          className={
                            star <= userRating
                              ? 'fill-gold text-gold'
                              : 'fill-hairline/10 text-hairline/30'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-boneDim mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Anand Kumar"
                      className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-sm text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-boneDim mb-1.5">
                      Your Review
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={userReviewText}
                      onChange={(e) => setUserReviewText(e.target.value)}
                      placeholder="Share your experience about cloth quality, fit, pricing or service..."
                      className="w-full bg-charcoal border border-hairline/10 rounded-xl px-4 py-2.5 text-sm text-bone placeholder:text-boneDim focus:outline-none focus:border-gold/50"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 bg-charcoal border border-hairline/10 text-bone rounded-full py-3 text-xs uppercase font-semibold tracking-wider hover:bg-charcoal/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gold text-onGold rounded-full py-3 text-xs uppercase font-bold tracking-wider hover:bg-goldDeep transition-colors shadow-lg shadow-gold/20"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
