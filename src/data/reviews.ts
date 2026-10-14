export type ReviewShot = {
  id: string;
  title: string;
  text: string;
  name: string;
  place: string;
  rating: number;
  image: string;
};

// Mock customer stories — replace with real feedback once the store goes live.
export const customerReviews: ReviewShot[] = [
  { id: 'r1', title: 'Premium feel', text: 'Fabric quality is far better than the price suggests. The slim fit shirt fits perfectly.', name: 'Aarav M.', place: 'Namakkal', rating: 5, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600' },
  { id: 'r2', title: 'Super fit', text: 'Ordered jeans in my usual size and it was spot on. Quick delivery too.', name: 'Rohit S.', place: 'Salem', rating: 5, image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=600' },
  { id: 'r3', title: 'Festive favourite', text: 'The kurta set got so many compliments at the function. Colour matched the photos.', name: 'Naveen K.', place: 'Erode', rating: 5, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600' },
  { id: 'r4', title: 'Great offers', text: 'Got three tees in the buy 2 get 1 deal. Packing was neat and on time.', name: 'Vignesh S.', place: 'Trichy', rating: 4, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600' },
  { id: 'r5', title: 'Smart formal wear', text: 'Trousers and shirt for office — comfortable the whole day and the finish is clean.', name: 'Karthik R.', place: 'Coimbatore', rating: 5, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=600' },
  { id: 'r6', title: 'Easy ordering', text: 'WhatsApp updates at every step. Will order again for the next season drop.', name: 'Manoj P.', place: 'Madurai', rating: 5, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600' }
];

export const recentOrders: ReviewShot[] = [
  { id: 'o1', title: 'Order packed', text: 'Weekend dispatch packed and handed over to the courier from our Mohanur store.', name: 'Dispatch desk', place: 'Mohanur', rating: 5, image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=600' },
  { id: 'o2', title: 'Order to Theni', text: 'Two shirts and a chino shipped with express courier.', name: 'Arun P.', place: 'Theni', rating: 5, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600' },
  { id: 'o3', title: 'Order to Tirupathur', text: 'Festive kurta combo dispatched in 24 hours.', name: 'Senthil N.', place: 'Tirupathur', rating: 5, image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=600' },
  { id: 'o4', title: 'Order in Mohanur', text: 'Same-day local delivery of a polo and trouser set.', name: 'Venkat K.', place: 'Mohanur', rating: 5, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600' }
];
