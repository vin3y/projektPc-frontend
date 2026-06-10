import { CardImage } from "@/components/homePage/CardComponent";
import { NavigationMenuDemo } from "@/components/homePage/NavigationMenu";
import { getNearListing } from "@/services/listings/listing";
import { useAppSelector } from "@/store/hooks";
import { setNearbyListings } from "@/store/slices/nearbyListing";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const locationState = useAppSelector((state) => state.location);
  const listingResults = useAppSelector(
    (state) => state.nearbyListings.results,
  );

  useEffect(() => {
    const { latitude, longitude } = locationState;

    if (latitude === null || longitude === null) {
      return;
    }
    const fetchListings = async () => {
      try {
        const response = await getNearListing({
          latitude,
          longitude,
          radius: 25,
          page: 1,
          limit: 10,
        });
        console.log("response", response);
        console.log("response.results", response.results);

        dispatch(setNearbyListings(response.results));
      } catch (error) {
        console.error("couldnt load the error", error);
      }
    };

    if (locationState.latitude && locationState.longitude) {
      fetchListings();
    }
  }, [locationState.latitude, locationState.longitude]);

  return (
    <div className="w-screen min-h-screen bg-slate-900 text-white">
      <NavigationMenuDemo />
      <div className="grid grid-cols-1 mt-10 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listingResults.map((listing) => (
          <CardImage key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
