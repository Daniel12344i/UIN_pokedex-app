import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "p3nido96", // Erstatt med ditt prosjekt-ID
  dataset: "production",
  apiVersion: "2023-01-01", // Bruk den nyeste versjonen
  useCdn: true, // `false` hvis du vil alltid hente ferske data
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export default client; // Merk at vi eksporterer client som default
