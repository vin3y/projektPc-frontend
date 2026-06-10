import { CardImage } from "@/components/homePage/CardComponent";
import { NavigationMenuDemo } from "@/components/homePage/NavigationMenu";
import { type Listing, getNearListing } from "@/services/listings/listing";
import type React from "react";
import { useEffect, useState } from "react";

interface HomePageProps {
  latitude: number;
  longitude: number;
}

const HomePage: React.FC<HomePageProps> = ({ latitude, longitude }) => {
  const [listingResult, setListingResult] = useState<Listing[]>([]);

  // const [lisitingParm, setLisitingParam] = useState<NearbyListingRequest>({
  //   latitude: 0.0,
  //   longitude: 0.0,
  //   radius: 25,
  //   page: 1,
  //   limit: 10,
  // });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getNearListing({
          latitude,
          longitude,
          radius: 25,
          page: 1,
          limit: 10,
        });

        setListingResult(response.results);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    if (latitude && longitude) {
      fetchListings();
    }
  }, [latitude, longitude]);
  return (
    <div className="w-screen min-h-screen bg-slate-900 text-white">
      <NavigationMenuDemo />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listingResult.map((listing) => (
          <CardImage key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
