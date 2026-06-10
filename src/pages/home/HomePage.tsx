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
    const fetchListings = async () => {
      try {
        const response = await getNearListing({
          latitude: locationState.latitude,
          longitude: locationState.longitude,
          radius: 25,
          page: 1,
          limit: 10,
        });

        dispatch(setNearbyListings(response.results));
      } catch (error) {
        console.error("couldnt load the error", error);
      }
    };

    if (locationState.latitude && locationState.longitude) {
      fetchListings();
    }
  }, [locationState.latitude, locationState.longitude]);

  // useEffect(() => {
  //   const fetchListings = async () => {
  //     try {
  //       const response = await getNearListing({
  //         // latitude,
  //         // longitude,
  //         radius: 25,
  //         page: 1,
  //         limit: 10,
  //       });

  //       setListingResult(response.results);
  //     } catch (error) {
  //       console.error("Failed to fetch listings:", error);
  //     }
  //   };

  //   if (latitude && longitude) {
  //     fetchListings();
  //   }
  // }, [latitude, longitude]);
  return (
    <div className="w-screen min-h-screen bg-slate-900 text-white">
      <NavigationMenuDemo />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listingResults.map((listing) => (
          <CardImage key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
