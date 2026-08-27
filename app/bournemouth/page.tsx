import type { Metadata } from "next";
import LocationLanding from "@/components/sections/LocationLanding";
import { getLocation } from "@/data/locations";
import { locationMetadata, locationJsonLd } from "@/lib/seo";

const location = getLocation("bournemouth")!;

export const metadata: Metadata = locationMetadata(location);

export default function BournemouthPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd(location)) }}
      />
      <LocationLanding location={location} />
    </>
  );
}
