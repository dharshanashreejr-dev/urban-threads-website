export type Product = {
  id: string;
  name: string;
  category: 'Shirts' | 'T-Shirts' | 'Trousers' | 'Jeans' | 'Ethnic' | 'Formal';
  price: number;
  sizes: string[];
  color: string;
  image: string;
  description: string;
  trending?: boolean;
  isNew?: boolean;
  stock: number;
};

export const products: Product[] = [
  {
    id: 'p1',
    stock: 27,
    name: 'Charcoal Slim Fit Shirt',
    category: 'Shirts',
    price: 799,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Charcoal',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800',
    description: 'Premium cotton-blend slim fit shirt, wholesale-grade stitching, everyday formal wear.',
    trending: true
  },
  {
    id: 'p2',
    stock: 34,
    name: 'Mustard Textured Casual Shirt',
    category: 'Shirts',
    price: 699,
    sizes: ['M', 'L', 'XL'],
    color: 'Mustard',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800',
    description: 'Textured weave casual shirt with a rich mustard tone, half-sleeve and full-sleeve available.',
    trending: true,
    isNew: true
  },
  {
    id: 'p3',
    stock: 41,
    name: 'Classic Round Neck Tee',
    category: 'T-Shirts',
    price: 349,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800',
    description: '220 GSM cotton round neck tee, bulk-order favourite, fade-resistant print base.'
  },
  {
    id: 'p4',
    stock: 48,
    name: 'Rust Polo Tee',
    category: 'T-Shirts',
    price: 449,
    sizes: ['M', 'L', 'XL'],
    color: 'Rust',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800',
    description: 'Pique cotton polo, ribbed collar, smart-casual pick for everyday retail racks.',
    isNew: true
  },
  {
    id: 'p5',
    stock: 55,
    name: 'Formal Straight Fit Trouser',
    category: 'Trousers',
    price: 899,
    sizes: ['30', '32', '34', '36', '38'],
    color: 'Grey',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800',
    description: 'Straight fit formal trouser, wrinkle-resistant fabric, office and festive wear.'
  },
  {
    id: 'p6',
    stock: 62,
    name: 'Slim Taper Denim Jeans',
    category: 'Jeans',
    price: 1099,
    sizes: ['30', '32', '34', '36'],
    color: 'Indigo Blue',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800',
    description: 'Stretch denim, slim taper cut, stone-wash finish, all-day comfort.',
    trending: true
  },
  {
    id: 'p7',
    stock: 69,
    name: 'Distressed Straight Jeans',
    category: 'Jeans',
    price: 1199,
    sizes: ['30', '32', '34', '36', '38'],
    color: 'Light Blue',
    image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=800',
    description: 'Straight fit with light distress detailing, heavyweight denim built for retail turnover.',
    isNew: true
  },
  {
    id: 'p8',
    stock: 76,
    name: 'Ivory Kurta Set',
    category: 'Ethnic',
    price: 1299,
    sizes: ['M', 'L', 'XL', 'XXL'],
    color: 'Ivory',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800',
    description: 'Festive kurta-pyjama set, breathable cotton, in demand during wedding season.',
    trending: true
  },
  {
    id: 'p9',
    stock: 40,
    name: 'Navy Oxford Formal Shirt',
    category: 'Shirts',
    price: 849,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Navy',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800',
    description: 'Crisp oxford cotton formal shirt, button-down collar, ideal for office and client meetings.',
    trending: true,
    isNew: true
  },
  {
    id: 'p10',
    stock: 35,
    name: 'White Linen Summer Shirt',
    category: 'Shirts',
    price: 749,
    sizes: ['M', 'L', 'XL', 'XXL'],
    color: 'White',
    image: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?q=80&w=800',
    description: 'Breathable pure linen short-sleeve shirt, lightweight and perfect for Tamil Nadu heat.',
    isNew: true
  },
  {
    id: 'p11',
    stock: 50,
    name: 'Olive Green Overshirt',
    category: 'Shirts',
    price: 999,
    sizes: ['M', 'L', 'XL'],
    color: 'Olive',
    image: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=800',
    description: 'Heavy cotton overshirt with dual chest pockets, street-ready layering piece.',
    trending: true
  },
  {
    id: 'p12',
    stock: 45,
    name: 'Black Graphic Tee',
    category: 'T-Shirts',
    price: 399,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800',
    description: 'Soft 180 GSM jersey with clean back print area, youth retail favourite.',
    isNew: true
  },
  {
    id: 'p13',
    stock: 38,
    name: 'Beige Chino Trouser',
    category: 'Trousers',
    price: 949,
    sizes: ['30', '32', '34', '36', '38'],
    color: 'Beige',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800',
    description: 'Classic chino fit, mid-rise, soft twill — works for both casual and smart looks.',
    trending: true
  },
  {
    id: 'p14',
    stock: 42,
    name: 'Black Formal Dress Pant',
    category: 'Formal',
    price: 1099,
    sizes: ['30', '32', '34', '36', '38'],
    color: 'Black',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlx9to1M_e00I1plccCqaNW6gQBz9sAmesdEFAJ5g95hDYOTaTZPg8Dw&s=10',
    description: 'Premium formal dress pant with clean crease, stretch waistband, wedding & office ready.',
    isNew: true,
    trending: true
  },
  {
    id: 'p15',
    stock: 28,
    name: 'Maroon Bandhgala Blazer',
    category: 'Formal',
    price: 2499,
    sizes: ['M', 'L', 'XL', 'XXL'],
    color: 'Maroon',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800',
    description: 'Structured bandhgala / Jodhpuri style blazer, festive and groom wear staple from Mohanur.',
    trending: true,
    isNew: true
  },
  {
    id: 'p16',
    stock: 33,
    name: 'Gold Brocade Sherwani Set',
    category: 'Ethnic',
    price: 3999,
    sizes: ['M', 'L', 'XL', 'XXL'],
    color: 'Gold',
    image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?q=80&w=800',
    description: 'Full sherwani set with churidar — rich brocade work for weddings and receptions.',
    isNew: true
  },
  {
    id: 'p17',
    stock: 55,
    name: 'Sky Blue Casual Shirt',
    category: 'Shirts',
    price: 649,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Sky Blue',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800',
    description: 'Soft cotton casual shirt, easy iron, everyday wholesale mover.',
    trending: true
  },
  {
    id: 'p18',
    stock: 60,
    name: 'Charcoal Slim Chino',
    category: 'Trousers',
    price: 599,
    sizes: ['M', 'L', 'XL', 'XXL'],
    color: 'Charcoal',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800',
    description: 'Slim chino-cut menswear trouser, soft stretch fabric, smart-casual everyday wear.',
    isNew: true
  },
  {
    id: 'p19',
    stock: 30,
    name: 'Cream Pathani Suit',
    category: 'Ethnic',
    price: 1599,
    sizes: ['M', 'L', 'XL', 'XXL'],
    color: 'Cream',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800',
    description: 'Traditional Pathani kurta with salwar, soft cotton, festival and casual ethnic wear.',
    trending: true
  },
  {
    id: 'p20',
    stock: 25,
    name: 'Grey Three-Piece Suit',
    category: 'Formal',
    price: 4499,
    sizes: ['M', 'L', 'XL'],
    color: 'Grey',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800',
    description: 'Full three-piece formal suit — jacket, waistcoat & trouser. Premium finish for events.',
    isNew: true,
    trending: true
  }
];

export const categories = ['All', 'Shirts', 'T-Shirts', 'Trousers', 'Jeans', 'Ethnic', 'Formal'] as const;

/* ---------- Offers & deals (mock data) ---------- */
const OFFER_PERCENT: Record<string, number> = {
  p1: 25, p2: 30, p3: 20, p4: 35, p5: 15, p6: 40, p7: 30, p8: 25, p9: 20, p10: 35,
  p11: 45, p12: 25, p13: 20, p14: 15, p15: 30, p16: 20, p17: 25, p18: 40, p19: 20, p20: 15
};

export function getOffer(p: Product) {
  const pct = OFFER_PERCENT[p.id] ?? 10;
  const mrp = Math.round(p.price / (1 - pct / 100) / 10) * 10;
  return { pct, mrp, save: mrp - p.price };
}

/** Resolve a product picture from an order line item (exact name, then keyword, then fallback). */
export function imageForItemName(name: string): string {
  const exact = products.find((p) => p.name.toLowerCase() === name.toLowerCase());
  if (exact) return exact.image;
  const n = name.toLowerCase();
  const pick = (cat: Product['category']) => products.find((p) => p.category === cat)?.image;
  if (/jean|denim/.test(n)) return pick('Jeans') ?? products[0].image;
  if (/kurta|sherwani|pathani/.test(n)) return pick('Ethnic') ?? products[0].image;
  if (/polo|tee|t-shirt/.test(n)) return pick('T-Shirts') ?? products[0].image;
  if (/trouser|chino|pant/.test(n)) return pick('Trousers') ?? products[0].image;
  if (/blazer|suit/.test(n)) return pick('Formal') ?? products[0].image;
  return pick('Shirts') ?? products[0].image;
}

export const dealOfTheDay = () => products.find((p) => p.id === 'p11') ?? products[0];
