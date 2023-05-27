import React from "react";
import Link from "next/link";

//sanity img url client
import { urlFor } from "../lib/client";

//hero banner data from index
const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>Sound</h1>
        <img
          //image src url
          src={urlFor(heroBanner.image[0])}
          alt="headphones"
          className="hero-banner-image"
        />

        <div>
          {/* Next Link with dynamic id, make sure product name is lowercase*/}
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
