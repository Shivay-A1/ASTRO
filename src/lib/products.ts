import { PlaceHolderImages } from './placeholder-images';

export type ProductCategory = 'Stone' | 'Rudraksha' | 'Bracelet' | 'Temple & Consecrated' | 'Health & Immunity' | 'Yantra';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  longDescription: string;
  category: ProductCategory;
  image: {
    src: string;
    alt: string;
    aiHint: string;
  };
}

export const CATEGORIES: ProductCategory[] = [
  'Stone',
  'Rudraksha',
  'Bracelet',
  'Temple & Consecrated',
  'Health & Immunity',
  'Yantra'
];

const products: Product[] = [
  {
    id: '1',
    name: '7 Mukhi Rudraksha',
    description: 'Brings wealth and prosperity, associated with Goddess Mahalaxmi.',
    price: 49.99,
    category: 'Rudraksha',
    longDescription: 'The 7 Mukhi Rudraksha is a powerful and auspicious bead that represents the seven divine mothers (Sapta Matrikas) and is blessed by Goddess Mahalaxmi. It is known to bestow wealth, prosperity, and good fortune upon the wearer. This bead helps in overcoming financial difficulties and brings new opportunities for success. It also has healing properties, benefiting those with muscular pain and arthritis.',
    image: {
      src: PlaceHolderImages.find(p => p.id === 'product-1')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'product-1')?.description || '',
      aiHint: PlaceHolderImages.find(p => p.id === 'product-1')?.imageHint || '',
    },
  },
  {
    id: '2',
    name: 'Blue Sapphire (Neelam)',
    description: 'A powerful gemstone for Saturn, offering protection and rapid success.',
    price: 299.99,
    category: 'Stone',
    longDescription: 'Blue Sapphire, or Neelam, is one of the fastest-acting and most powerful gemstones. Associated with the planet Saturn (Shani), it can bring immense wealth, fame, and success if it proves to be suitable. It is also a highly protective stone, guarding against envy, enemies, and unforeseen dangers. Wearing a Blue Sapphire can improve decision-making, focus, and discipline.',
    image: {
      src: PlaceHolderImages.find(p => p.id === 'product-2')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'product-2')?.description || '',
      aiHint: PlaceHolderImages.find(p => p.id === 'product-2')?.imageHint || '',
    },
  },
  {
    id: '3',
    name: 'Crystal Healing Wand',
    description: 'Focuses and directs energy, ideal for meditation and healing.',
    price: 75.5,
    category: 'Health & Immunity',
    longDescription: 'This beautifully crafted Crystal Healing Wand is made from pure, high-vibration quartz. Wands are powerful tools for healers, as they can focus and direct energy through their tip. This wand is perfect for chakra balancing, energy cleansing, meditation, and spiritual healing practices. Its form allows for precise energy work, making it an essential tool for any practitioner.',
    image: {
      src: PlaceHolderImages.find(p => p.id === 'product-3')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'product-3')?.description || '',
      aiHint: PlaceHolderImages.find(p => p.id === 'product-3')?.imageHint || '',
    },
  },
  {
    id: '4',
    name: 'Zodiac Constellation Necklace',
    description: 'A stylish gold-plated necklace featuring your own zodiac constellation.',
    price: 89.0,
    category: 'Bracelet',
    longDescription: 'Wear your cosmic identity with pride. This elegant necklace is gold-plated and features a delicate pendant with your chosen zodiac constellation, studded with tiny cubic zirconia crystals to represent the stars. It\'s a personal and meaningful piece of jewelry that connects you to your astrological sign and the universe. A perfect gift for yourself or a loved one.',
    image: {
      src: PlaceHolderImages.find(p => p.id === 'product-4')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'product-4')?.description || '',
      aiHint: PlaceHolderImages.find(p => p.id === 'product-4')?.imageHint || '',
    },
  },
  {
    id: '5',
    name: 'Amethyst Geode',
    description: 'A stunning natural decor piece that calms the mind and spirit.',
    price: 150.0,
    category: 'Stone',
    longDescription: 'This large Amethyst geode is a breathtaking piece of natural art. Amethyst is known for its calming and spiritual properties, believed to reduce stress, soothe irritability, and dispel negativity. Placing this geode in your home or office not only enhances the aesthetic but also creates a tranquil atmosphere conducive to meditation and peace.',
    image: {
      src: PlaceHolderImages.find(p => p.id === 'product-5')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'product-5')?.description || '',
      aiHint: PlaceHolderImages.find(p => p.id === 'product-5')?.imageHint || '',
    },
  },
  {
    id: '6',
    name: 'Astrology Tarot Deck',
    description: 'A 78-card tarot deck infused with astrological symbolism.',
    price: 39.99,
    category: 'Temple & Consecrated',
    longDescription: 'Deepen your tarot readings with this unique deck that beautifully merges traditional tarot archetypes with the wisdom of astrology. Each card is rich with celestial imagery, planetary symbols, and zodiacal correlations, providing layered meanings for more insightful interpretations. Perfect for both beginners and experienced readers looking to explore the connection between tarot and the cosmos.',
    image: {
      src: PlaceHolderImages.find(p => p.id === 'product-6')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'product-6')?.description || '',
      aiHint: PlaceHolderImages.find(p => p.id === 'product-6')?.imageHint || '',
    },
  },
  {
    id: '7',
    name: 'Tibetan Singing Bowl',
    description: 'Hand-hammered bowl for sound healing and meditation.',
    price: 120.0,
    category: 'Temple & Consecrated',
    longDescription: 'Create resonant, healing sounds with this authentic Tibetan Singing Bowl. Hand-hammered by artisans in Nepal, this bowl produces complex harmonics that promote deep relaxation and are ideal for sound therapy, meditation, and mindfulness practices. The set includes a wooden mallet and a cushion to rest the bowl on. Its vibrations can help balance chakras and cleanse a space of negative energy.',
    image: {
      src: PlaceHolderImages.find(p => p.id === 'product-7')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'product-7')?.description || '',
      aiHint: PlaceHolderImages.find(p => p.id === 'product-7')?.imageHint || '',
    },
  },
  {
    id: '8',
    name: 'Emerald (Panna)',
    description: 'Represents the planet Mercury, enhancing intellect and communication.',
    price: 250.0,
    category: 'Stone',
    longDescription: 'Emerald, also known as Panna, is a precious gemstone associated with the planet Mercury (Budha). It is believed to enhance intellect, memory, communication skills, and intuition. An Emerald is often worn by students, artists, and business people to foster creativity and success. This stone also promotes harmony and love in relationships.',
    image: {
      src: PlaceHolderImages.find(p => p.id === 'product-8')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'product-8')?.description || '',
      aiHint: PlaceHolderImages.find(p => p.id === 'product-8')?.imageHint || '',
    },
  },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return products.find(p => p.id === id);
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return products.filter(p => p.category === category);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.longDescription.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}
