//dynamic [slug], file based routing from NextJs, headphones etc
import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";

//use our Context like a hook
import { useStateContext } from "@/context/StateContext";

//products form props request below
const ProductDetails = ({ product, products }) => {
  //don't forget to import setters
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  //start index at 0
  const [index, setIndex] = useState(0);
  //descstructure details
  const { image, name, details, price } = product;

  //buy now btn, adds to cart and shows cart
  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          {/* //large image */}
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>

          {/* //small images below */}
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                //if item in images is the selected index, gets a diff class (red)
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                //get index of item we click
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        {/* //DETAILS */}
        <div className="product-detail-desc">
          <h1>{name}</h1>
          {/* //review stars */}
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          {/* //cart quanitity */}
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              {/* decrease */}
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              {/* increase */}
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {/* ADD TO CART AND BUY NOW BTNS */}
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* YMAL */}
      <div className="maylike-products-wrapper">
        <h2>You May Also Like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {/* map over products, product component */}
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//fetch request query
//static props, when data is already stored somewhere, also when using headless CMS
//NEED STATIC PATHS THAT GOES WITH IT
//we can get the slug from url

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  //returns object with slug
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

//product fetch request
export const getStaticProps = async ({ params: { slug } }) => {
  //slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  //all products
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
