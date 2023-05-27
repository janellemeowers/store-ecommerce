import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

//create client config
const config = {
  projectId: "jv93lohj",
  dataset: "production",
  apiVersion: "2023-05-01",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

export const urlFor = (source) => builder.image(source);

//create client instance
export const client = createClient(config);

//for images, from Sanity docu
const builder = imageUrlBuilder(client);
