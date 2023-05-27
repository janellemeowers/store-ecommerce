import React from "react";
//since they were exported in index.js components
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";

//home index
//remove return so you have your fetch request below
// product and bannerData request below, props here
const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData?.length && bannerData[0]} />
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers to fit all your needs</p>
    </div>
    {/* //PRODUCTS */}
    <div className="products-container">
      {/* //product data, must map over Array */}
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
    {/* //if banner data exists */}
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

//fetch request via Next js
export const getServerSideProps = async () => {
  //main query ALL products
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  //banner query
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  //return data
  return {
    props: { products, bannerData },
  };
};
export default Home;
