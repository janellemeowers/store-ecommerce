import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

//destructure product items (image, slug etc)
const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      {/* link to product, unique [slug].js page */}
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            //chec image exists and then use image0
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
