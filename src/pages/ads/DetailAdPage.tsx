import { getAdDetails } from "@/services/listings/listing";
import { useAppSelector } from "@/store/hooks";
import { setDetailedAdListings } from "@/store/slices/detailedAd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const DetailAdPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  const detailedAdDetails = useAppSelector(
    (state) => state.detailedAdDetails.adDetails,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (id == null || category == null) {
      return;
    }
    const getAd = async () => {
      try {
        const response = await getAdDetails({
          id,
          category,
        });

        dispatch(setDetailedAdListings(response.result));
        console.log("test", detailedAdDetails);
      } catch (error) {
        console.log("someting happend", error);
      }
    };

    getAd();
  }, []);

  useEffect(() => {
    console.log("Redux State:", detailedAdDetails);
  }, [detailedAdDetails]);

  return (
    <div>
      <h1>Test Component</h1>
      <h1 className="text-black">{detailedAdDetails?.title}</h1>
      <h1 className="text-black">{detailedAdDetails?.description}</h1>
      <img src={detailedAdDetails?.primaryImageUrl} alt="primary-image" />
    </div>
  );
};

export default DetailAdPage;
