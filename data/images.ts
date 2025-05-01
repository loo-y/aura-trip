export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  description: string;
  time: string;
  day: number;
  type: 'attraction' | 'accommodation' | 'transportation' | 'dining';
  price: number;
  bookingInfo?: {
    duration?: string;
    address?: string;
    rating?: number;
    amenities?: string[];
  };
}

export const galleryImages: GalleryImage[] = [
  // Day 1
  {
    id: "1",
    src: "https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg",
    alt: "Kyoto Imperial Palace",
    width: 1280,
    height: 853,
    description: "Start your journey at the majestic Kyoto Imperial Palace, where centuries of Japanese history come alive through traditional architecture and meticulously maintained gardens.",
    time: "9:00 AM",
    day: 1,
    type: "attraction",
    price: 0,
    bookingInfo: {
      duration: "2 hours",
      address: "3 Kyotogyoen, Kamigyo Ward, Kyoto",
      rating: 4.8
    }
  },
  {
    id: "transport-1",
    src: "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg",
    alt: "Private Car Service",
    width: 1280,
    height: 853,
    description: "Travel in comfort with our luxury private car service, ensuring seamless transportation between destinations.",
    time: "10:30 AM",
    day: 1,
    type: "transportation",
    price: 150,
    bookingInfo: {
      duration: "Full Day",
      rating: 4.9,
      amenities: ["Professional driver", "WiFi", "Bottled water"]
    }
  },
  {
    id: "2",
    src: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
    alt: "Kinkaku-ji (Golden Pavilion)",
    width: 1280,
    height: 853,
    description: "Visit the iconic Golden Pavilion, a Zen temple whose top two floors are completely covered in gold leaf, reflecting beautifully in the surrounding pond.",
    time: "11:30 AM",
    day: 1,
    type: "attraction",
    price: 25,
    bookingInfo: {
      duration: "1.5 hours",
      address: "1 Kinkakujicho, Kita Ward, Kyoto",
      rating: 4.9
    }
  },
  {
    id: "dining-1",
    src: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg",
    alt: "Traditional Kaiseki Lunch",
    width: 1280,
    height: 853,
    description: "Experience an exquisite kaiseki lunch featuring seasonal ingredients and artful presentation in a traditional setting.",
    time: "1:00 PM",
    day: 1,
    type: "dining",
    price: 120,
    bookingInfo: {
      duration: "1.5 hours",
      address: "Gion District, Kyoto",
      rating: 4.9,
      amenities: ["Private dining room", "Vegetarian options", "Tea ceremony"]
    }
  },
  {
    id: "accommodation-1",
    src: "https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg",
    alt: "Luxury Ryokan Stay - Night 1",
    width: 1280,
    height: 853,
    description: "Rest in a luxurious ryokan featuring private onsen baths, traditional futon bedding, and impeccable hospitality.",
    time: "8:00 PM",
    day: 1,
    type: "accommodation",
    price: 450,
    bookingInfo: {
      duration: "1 night",
      address: "Southern Higashiyama, Kyoto",
      rating: 4.9,
      amenities: ["Private onsen", "Traditional breakfast", "Yukata provided", "Garden view"]
    }
  },
  // Day 2
  {
    id: "3",
    src: "https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg",
    alt: "Arashiyama Bamboo Grove",
    width: 1280,
    height: 853,
    description: "Start your second day with an early morning walk through the enchanting Arashiyama Bamboo Grove, where towering green stalks filter the sunlight and create an otherworldly atmosphere.",
    time: "8:00 AM",
    day: 2,
    type: "attraction",
    price: 0,
    bookingInfo: {
      duration: "1 hour",
      address: "Arashiyama, Kyoto",
      rating: 4.7
    }
  },
  {
    id: "4",
    src: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
    alt: "Fushimi Inari Shrine",
    width: 1280,
    height: 853,
    description: "Explore the thousands of vermillion torii gates at Fushimi Inari Shrine, winding their way up the sacred Mount Inari.",
    time: "11:00 AM",
    day: 2,
    type: "attraction",
    price: 0,
    bookingInfo: {
      duration: "2 hours",
      address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
      rating: 4.8
    }
  },
  {
    id: "dining-2",
    src: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
    alt: "Premium Sushi Dinner",
    width: 1280,
    height: 853,
    description: "Conclude your day with an intimate sushi experience, where master chefs craft each piece with precision and artistry.",
    time: "6:30 PM",
    day: 2,
    type: "dining",
    price: 200,
    bookingInfo: {
      duration: "2 hours",
      address: "Gion District, Kyoto",
      rating: 4.9,
      amenities: ["Omakase menu", "Sake pairing", "Counter seating"]
    }
  },
  {
    id: "accommodation-2",
    src: "https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg",
    alt: "Luxury Ryokan Stay - Night 2",
    width: 1280,
    height: 853,
    description: "Enjoy another peaceful night in our luxury ryokan, perhaps trying a different onsen bath or seasonal kaiseki dinner.",
    time: "8:00 PM",
    day: 2,
    type: "accommodation",
    price: 450,
    bookingInfo: {
      duration: "1 night",
      address: "Southern Higashiyama, Kyoto",
      rating: 4.9,
      amenities: ["Private onsen", "Traditional breakfast", "Yukata provided", "Garden view"]
    }
  }
];