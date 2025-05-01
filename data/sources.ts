export interface ItinerarySource {
  id: string;
  name: string;
  description: string;
  url: string;
  type: 'guide' | 'blog' | 'official';
  rating?: number;
  verified: boolean;
}

export const itinerarySources: ItinerarySource[] = [
  {
    id: "1",
    name: "Japan National Tourism Organization",
    description: "Official travel guide for Kyoto's cultural heritage sites",
    url: "https://www.japan.travel/en/destinations/kansai/kyoto/",
    type: "official",
    verified: true
  },
  {
    id: "2",
    name: "Kyoto Travel Guide",
    description: "Comprehensive guide to Kyoto's temples and shrines",
    url: "https://www.insidekyoto.com/",
    type: "guide",
    rating: 4.8,
    verified: true
  },
  {
    id: "3",
    name: "Traditional Kyoto",
    description: "Expert insights on traditional accommodations and dining",
    url: "https://www.kyoto.travel/",
    type: "official",
    verified: true
  }
];