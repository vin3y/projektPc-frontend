import type { Listing } from "@/services/listings/listing";
import { Badge } from "../../../@/components/ui/badge";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";

interface ListingCardProps {
  listing: Listing;
}

export function CardImage({ listing }: ListingCardProps) {
  console.log(listing);
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      <img
        src={listing.primaryImageUrl}
        alt={listing.title}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{listing.category}</Badge>
        </CardAction>

        <CardTitle>{listing.title}</CardTitle>

        <CardDescription>{listing.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button className="w-full">₹{listing.price.toLocaleString()}</Button>
      </CardFooter>
    </Card>
  );
}
