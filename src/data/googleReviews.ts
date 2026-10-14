export type GoogleReview = {
  id: string;
  authorName: string;
  authorUrl: string;
  authorAvatar?: string;
  isLocalGuide: boolean;
  reviewCount: number;
  photoCount?: number;
  rating: number; // 1 to 5
  relativeTime: string;
  timestampDaysAgo: number; // for chronological sorting
  text: string;
  reactions?: { icon: string; count: number; label: string }[];
  tags: string[];
  helpfulCount: number;
  isNew?: boolean;
};

export const STORE_GOOGLE_METADATA = {
  name: 'Urban Threads',
  address: '15/8 Velur Road, Mohanur, Namakkal, Tamil Nadu 637015, India',
  fullAddress: '15/8 Velur Road, Mohanur, Namakkal, Tamil Nadu 637015',
  rating: 4.7,
  totalReviews: 14,
  googleMapsUrl: 'https://maps.google.com/?q=15%2F8+Velur+Road+Mohanur+Namakkal',
  ratingDistribution: {
    5: 10,
    4: 4,
    3: 0,
    2: 0,
    1: 0
  }
};

export const googleReviews: GoogleReview[] = [
  {
    id: 'gr-1',
    authorName: "Aarav Menon",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 3,
    rating: 5,
    relativeTime: "a week ago",
    timestampDaysAgo: 7,
    text: "Lovely collection and the festive offers are genuinely good. Got two shirts and a chino at a great price.",
    tags: ["Recent", "Quality"],
    helpfulCount: 2,
    isNew: true
  },
  {
    id: 'gr-2',
    authorName: "Divya Lakshmi",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 4,
    rating: 5,
    relativeTime: "2 weeks ago",
    timestampDaysAgo: 14,
    text: "Fit is perfect and the fabric feels premium. Delivery to my place was quick.",
    tags: ["Quality", "Friendly Service"],
    helpfulCount: 3
  },
  {
    id: 'gr-3',
    authorName: "Rohit Sharma",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 5,
    rating: 4,
    relativeTime: "3 weeks ago",
    timestampDaysAgo: 21,
    text: "Good range of casual shirts and tees. Trending offers on the website helped me save a lot.",
    tags: ["Value"],
    helpfulCount: 4
  },
  {
    id: 'gr-4',
    authorName: "Naveen Kumar",
    authorUrl: '#',
    isLocalGuide: true,
    reviewCount: 6,
    rating: 5,
    relativeTime: "a month ago",
    timestampDaysAgo: 30,
    text: "Ordered a kurta set for a family function. Stitching and colour exactly like the photo.",
    tags: ["Quality"],
    helpfulCount: 5
  },
  {
    id: 'gr-5',
    authorName: "Priya Dharshini",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 2,
    rating: 5,
    relativeTime: "a month ago",
    timestampDaysAgo: 33,
    text: "Friendly staff, easy returns and very reasonable pricing. Will shop again.",
    tags: ["Friendly Service"],
    helpfulCount: 6
  },
  {
    id: 'gr-6',
    authorName: "Suresh Babu",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 3,
    rating: 4,
    relativeTime: "2 months ago",
    timestampDaysAgo: 58,
    text: "Nice denim collection. Size guide was accurate. Would love more colour options.",
    tags: ["Value"],
    helpfulCount: 1
  },
  {
    id: 'gr-7',
    authorName: "Karthikeyan R",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 4,
    rating: 5,
    relativeTime: "2 months ago",
    timestampDaysAgo: 62,
    text: "Best place for men's wear around Mohanur. The new arrivals are updated every week.",
    tags: ["Quality", "Recent"],
    helpfulCount: 2
  },
  {
    id: 'gr-8',
    authorName: "Meena Kumari",
    authorUrl: '#',
    isLocalGuide: true,
    reviewCount: 5,
    rating: 5,
    relativeTime: "2 months ago",
    timestampDaysAgo: 66,
    text: "Bought gifts for my brother, packing was neat and delivery was on time.",
    tags: ["Friendly Service"],
    helpfulCount: 3
  },
  {
    id: 'gr-9',
    authorName: "Vignesh S",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 6,
    rating: 4,
    relativeTime: "3 months ago",
    timestampDaysAgo: 90,
    text: "Good quality polos and trousers. Prices are fair for the material.",
    tags: ["Value"],
    helpfulCount: 4
  },
  {
    id: 'gr-10',
    authorName: "Harini Priya",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 2,
    rating: 5,
    relativeTime: "3 months ago",
    timestampDaysAgo: 96,
    text: "Smooth ordering, WhatsApp updates were helpful. Loved the linen shirt.",
    tags: ["Quality"],
    helpfulCount: 5
  },
  {
    id: 'gr-11',
    authorName: "Manoj Prabhu",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 3,
    rating: 5,
    relativeTime: "3 months ago",
    timestampDaysAgo: 100,
    text: "Great offers during the festive sale. Blazer fit really well.",
    tags: ["Value", "Quality"],
    helpfulCount: 6
  },
  {
    id: 'gr-12',
    authorName: "Ashok Raj",
    authorUrl: '#',
    isLocalGuide: true,
    reviewCount: 4,
    rating: 5,
    relativeTime: "4 months ago",
    timestampDaysAgo: 120,
    text: "Courteous team and quick alteration help. Highly recommended.",
    tags: ["Friendly Service"],
    helpfulCount: 1
  },
  {
    id: 'gr-13',
    authorName: "Sangeetha M",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 5,
    rating: 4,
    relativeTime: "4 months ago",
    timestampDaysAgo: 125,
    text: "Good variety for the whole family budget. Delivery took a day more than expected but fine.",
    tags: ["Value"],
    helpfulCount: 2
  },
  {
    id: 'gr-14',
    authorName: "Gowtham K",
    authorUrl: '#',
    isLocalGuide: false,
    reviewCount: 6,
    rating: 5,
    relativeTime: "5 months ago",
    timestampDaysAgo: 150,
    text: "Premium look at honest prices. The Pathani suit was a hit at my cousin's wedding.",
    tags: ["Quality"],
    helpfulCount: 3
  }
];
