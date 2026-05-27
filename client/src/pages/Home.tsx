import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

/**
 * Design Philosophy: Luxury Minimalism with Depth
 * - Elegant serif typography (Playfair Display) for headings
 * - Clean sans-serif (Lato) for body text
 * - Warm gold accents (#d4af37) and deep charcoal (#1a1a1a)
 * - Smooth scroll-triggered animations with 30fps optimization
 * - Parallax effects and subtle depth perception
 */

interface DishData {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  ingredients: string[];
}

const dishes: DishData[] = [
  {
    id: 1,
    name: 'Pan-Seared Foie Gras',
    description: 'Delicate foie gras with microgreens, edible flowers, and gold leaf accents. A timeless expression of culinary elegance.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663702079934/GHJwBSp89WRbKjoHuBpq4B/dish-1-gourmet-axKMYPADhddFPDmFyTboWc.webp',
    price: '$48',
    ingredients: ['Foie Gras', 'Microgreens', 'Edible Flowers', 'Gold Leaf'],
  },
  {
    id: 2,
    name: 'Seared Scallops',
    description: 'Premium hand-harvested scallops with saffron beurre blanc, caviar, and artistic plating. A celebration of the sea.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663702079934/GHJwBSp89WRbKjoHuBpq4B/dish-2-seafood-8fGu3hxQnngma5tiWwR4Vo.webp',
    price: '$52',
    ingredients: ['Scallops', 'Saffron', 'Caviar', 'Microgreens'],
  },
  {
    id: 3,
    name: 'Dark Chocolate Decadence',
    description: 'Layers of premium dark chocolate, fresh berries, and gold leaf. A sophisticated finale to your culinary journey.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663702079934/GHJwBSp89WRbKjoHuBpq4B/dish-3-dessert-R9VwbGsH32nr3DcdH9PvgM.webp',
    price: '$24',
    ingredients: ['Dark Chocolate', 'Berries', 'Gold Leaf', 'Cream'],
  },
];

function HeroSection() {
  const { ref, scrollProgress } = useScrollAnimation({ threshold: 0.5 });

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663702079934/GHJwBSp89WRbKjoHuBpq4B/hero-background-2NLqiqxNmBCnSbyGuejjYP.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative z-10 text-center px-6 transition-all duration-500"
        style={{
          opacity: 1 - scrollProgress * 0.5,
          transform: `translateY(${scrollProgress * 50}px)`,
        }}
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg">
          Culinary Excellence
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 font-light drop-shadow-md">
          Experience the art of fine dining
        </p>
      </div>
    </section>
  );
}

function DishCard({ dish, index }: { dish: DishData; index: number }) {
  const { ref, scrollProgress } = useScrollAnimation({ threshold: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  const isEven = index % 2 === 0;

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    target.style.backgroundColor = '#d4af37';
    target.style.color = '#1a1a1a';
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    target.style.backgroundColor = '#1a1a1a';
    target.style.color = '#ffffff';
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 md:px-12 overflow-hidden"
      style={{
        backgroundColor: isEven ? '#f5f3f0' : '#ffffff',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
            isEven ? '' : 'md:grid-flow-dense'
          }`}
        >
          {/* Image Container */}
          <div
            className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transform: `scale(${1 + scrollProgress * 0.05}) rotateY(${scrollProgress * 5}deg)`,
              transition: 'transform 0.3s ease-out',
              perspective: '1000px',
            }}
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              style={{
                filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                transform: `scale(${isHovered ? 1.05 : 1})`,
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            />
            {/* Gold accent border */}
            <div
              className="absolute inset-0 border-2"
              style={{ borderColor: '#d4af37', opacity: scrollProgress * 0.5 }}
            />
          </div>

          {/* Content Container */}
          <div
            className={`space-y-6 ${isEven ? '' : 'md:col-start-1'}`}
            style={{
              opacity: 0.5 + scrollProgress * 0.5,
              transform: `translateX(${(1 - scrollProgress) * (isEven ? -30 : 30)}px)`,
              transition: 'all 0.3s ease-out',
            }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {dish.name}
              </h2>
              <div
                className="h-1 w-24 rounded-full"
                style={{ backgroundColor: '#d4af37' }}
              />
            </div>

            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {dish.description}
            </p>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ingredient, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm font-light"
                    style={{
                      backgroundColor: '#f0ede8',
                      color: '#1a1a1a',
                      border: '1px solid #d4af37',
                    }}
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <span
                className="text-3xl font-bold"
                style={{ color: '#d4af37' }}
              >
                {dish.price}
              </span>
            </div>

            <button
              className="mt-8 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>

      {/* Decorative divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: '#d4af37', opacity: 0.3 }}
      />
    </section>
  );
}

function RestaurantInfo() {
  const { ref, scrollProgress } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-12 bg-white"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div
          style={{
            opacity: 0.5 + scrollProgress * 0.5,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'all 0.3s ease-out',
          }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Our Restaurant
          </h2>
          <div
            className="h-1 w-32 rounded-full mx-auto mb-8"
            style={{ backgroundColor: '#d4af37' }}
          />
        </div>

        <p className="text-xl text-gray-700 leading-relaxed font-light">
          Established in 2015, our restaurant stands as a beacon of culinary excellence. 
          We believe in the marriage of tradition and innovation, where each dish tells a story 
          of passion, precision, and premium ingredients sourced from the finest suppliers worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            { title: 'Michelin Starred', description: 'Recognized for excellence' },
            { title: 'Expert Chefs', description: '20+ years of experience' },
            { title: 'Premium Ingredients', description: 'Sourced globally' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-lg"
              style={{
                backgroundColor: '#f5f3f0',
                border: '1px solid #d4af37',
                opacity: 0.5 + scrollProgress * 0.5,
                transform: `translateY(${(1 - scrollProgress) * (20 + i * 10)}px)`,
                transition: 'all 0.3s ease-out',
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, scrollProgress } = useScrollAnimation({ threshold: 0.3 });

  const handleBookButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    target.style.transform = 'scale(1.05)';
    target.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
  };

  const handleBookButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.boxShadow = 'none';
  };

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-12"
      style={{
        backgroundColor: '#1a1a1a',
      }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Reserve Your Table
        </h2>
        <p className="text-xl text-gray-300 font-light">
          Experience an unforgettable evening of culinary artistry
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          style={{
            opacity: 0.5 + scrollProgress * 0.5,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'all 0.3s ease-out',
          }}
        >
          {[
            { label: 'Phone', value: '+1 (555) 123-4567' },
            { label: 'Email', value: 'reservations@restaurant.com' },
            { label: 'Hours', value: 'Tue-Sun 6PM - 11PM' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-lg text-white font-light">{item.value}</p>
            </div>
          ))}
        </div>

        <button
          className="mt-12 px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          style={{
            backgroundColor: '#d4af37',
            color: '#1a1a1a',
          }}
          onMouseEnter={handleBookButtonMouseEnter}
          onMouseLeave={handleBookButtonMouseLeave}
        >
          Book Now
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      {dishes.map((dish, index) => (
        <DishCard key={dish.id} dish={dish} index={index} />
      ))}
      <RestaurantInfo />
      <ContactSection />
    </div>
  );
}
