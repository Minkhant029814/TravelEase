import { MapPinIcon } from "lucide-react";
import Link from "next/link";

const FeaturedDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      description:
        "Tropical paradise with beautiful beaches and rich cultural heritage.",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    },
    {
      id: 2,
      name: "Paris, France",
      description: "The city of lights known for romance, art, and cuisine.",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      description: "Ancient temples, traditional gardens, and cherry blossoms.",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
    {
      id: 4,
      description: "Stunning coastal views and vibrant Mediterranean culture.",
      name: "Santorini, Greece",
      image:
        "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
  ];
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Destinations
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore our handpicked selection of the most breathtaking and
            sought-after locations around the world.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 sm:aspect-w-3 sm:aspect-h-4">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="ml-2 text-lg font-medium text-gray-900">
                    {destination.name}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {destination.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500">
                    Explore destination
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FeaturedDestinations;
